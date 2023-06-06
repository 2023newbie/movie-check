const fs = require("fs");
const path = require("path");

// path to get data videolist
const p = path.join(
  path.dirname(require.main.filename),
  "data",
  "videoList.json"
);

// provide data, func sort data by published_at key
const sortDataByPublish = (data) => {
  // convert published_at key from date string to number
  const trailerVideoData2 = data.map((video) => {
    const date = new Date(video.published_at);
    const dateTime = date.getTime();
    return { ...video, published_at: dateTime };
  });

  // sort by number of published_at key
  trailerVideoData2.sort((a, b) => b.published_at - a.published_at);

  // after sort success, convert from number back to date string
  const trailerVideoData3 = trailerVideoData2.map((video) => {
    const date = new Date(video.published_at);
    return { ...video, published_at: date };
  });

  // then return
  return trailerVideoData3;
};

module.exports = class Video {
  // get trailer by id
  static getTrailer(id, cb) {
    fs.readFile(p, (err, fileContent) => {
      if (err) return cb({});

      const data = JSON.parse(fileContent);
      const neededData = data.find((item) => item.id === id) || {};
      
      // filter official = true
      if (Object.keys(neededData).length > 0) {
        const officialVideoData = neededData.videos.filter(
          (videoData) => videoData.official === true
        );

        // filter site = youtube
        if (officialVideoData.length > 0) {
          const youtubeVideoData = officialVideoData.filter(
            (video) => video.site === "YouTube"
          );

          // filter trailer & teaser
          if (youtubeVideoData.length > 0) {
            const trailerVideoData = youtubeVideoData.filter(
              (video) => video.type === "Trailer"
            );
            const teaserVideoData = youtubeVideoData.filter(
              (video) => video.type === "Teaser"
            );

            // check trailer arr first
            if (trailerVideoData.length > 0) {
              const sortedVideoData = sortDataByPublish(trailerVideoData);
              cb(sortedVideoData[0]);

              // if not trailer, check teaser
            } else if (teaserVideoData.length > 0) {
              const sortedVideoData = sortDataByPublish(teaserVideoData);
              cb(sortedVideoData[0]);

              // if not trailer => the rest situations return {}
            } else {
              cb({});
            }
          } else {
            cb({});
          }
        } else {
          cb({});
        }
      } else {
        cb({});
      }
    });
  }
};
