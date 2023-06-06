const fs = require("fs");
const path = require("path");

const p = path.join(
  path.dirname(require.main.filename),
  "data",
  "movieList.json"
);

// pagination
const pagination = (data) => {
  const dataLength = data.length;

  //number of page to paging
  const numberPage = Math.ceil(dataLength / 20);

  //create array of page
  const pageData = {};
  for (let i = 1; i <= numberPage; i++) {
    pageData[i] = [];
  }

  //push data to page
  let page = 1;
  for (let i = 0; i < dataLength; i++) {
    if (pageData[page].length < 20) {
      pageData[page].push(data[i]);
    } else {
      page++;
      pageData[page].push(data[i]);
    }
  }
  return pageData;
};

// convert data from file to data
const getDataFromFile = (cb) => {
  fs.readFile(p, (err, fileContent) => {
    if (err) return cb([]);
    const data = JSON.parse(fileContent);
    cb(data);
  });
};

module.exports = class Movies {
  //get all movie data
  static all(cb) {
    getDataFromFile((data) => {
      const pageData = pagination(data);
      cb(pageData);
    });
  }

  //get trending movie data
  static trending(cb) {
    getDataFromFile((data) => {
      data.sort((a, b) => b.popularity - a.popularity);
      const pageData = pagination(data);
      cb(pageData);
    });
  }

  //get top rate movie data
  static topRating(cb) {
    getDataFromFile((data) => {
      data.sort((a, b) => b.vote_average - a.vote_average);
      const pageData = pagination(data);
      cb(pageData);
    });
  }

  // get data by genre id
  static byGenre(cb, genreId) {
    getDataFromFile((data) => {
      const dataByGenre = data.filter((item) =>
        item.genre_ids.includes(genreId)
      );
      const pageData = pagination(dataByGenre);
      cb(pageData);
    });
  }

  //get data by keyword
  static byKeyword(cb, keyword) {
    // convert keyword to lowercase
    const keywordLowerCase = keyword.toLowerCase();

    getDataFromFile((data) => {
      const dataByKeyword = [];
      // convert overview and title key to lowercase
      // check includes
      // check with overview, then check with title, each true push to dataByKeyword
      for (let item of data) {
        if (item.overview)
          if (item.overview.toLowerCase().includes(keywordLowerCase))
            dataByKeyword.push(item);

        if (item.title)
          if (item.title.toLowerCase().includes(keywordLowerCase))
            dataByKeyword.push(item);
      }

      //use set to get unique data
      const uniqueDataByKeyword = [...new Set(dataByKeyword)];

      // pagination
      const pagedDataByKeyword = pagination(uniqueDataByKeyword)

      // // send to callback
      cb(pagedDataByKeyword, uniqueDataByKeyword);
    });
  }

  static byGenreFromData(cb, data, genreId) {
    const dataByGenre = data.filter((item) =>
      item.genre_ids.includes(genreId)
    );
    const pageData = pagination(dataByGenre);
    cb(pageData, dataByGenre);
  }
  
  static byMediaTypeFromData(cb, data, mediaType) {
    const dataByMediaType = data.filter((item) =>
      item.media_type === mediaType
    );
    const pageData = pagination(dataByMediaType);
    cb(pageData, dataByMediaType);
  }

  static byYear(cb, data, yearQuery) {
    const dataByYear = data.filter(item => {
      const itemDate = item.release_date || item.first_air_date
      const year = new Date(itemDate).getFullYear()
      return year === yearQuery
    })
    const pageData = pagination(dataByYear)
    cb(pageData, dataByYear)
  }
};  
