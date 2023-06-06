const Movies = require("../models/Movies");
const Genre = require("../models/Genre");

const responseMovies = (req, res, type, subOption) => {
  const queryPage = req.query.page;

  Movies[type]((data) => {
    const length = Object.keys(data).length;
    if (!queryPage) {
      res.status(200).send({
        results: data[1],
        page: 1,
        total_pages: length,
      });
    } else {
      res.status(200).send({
        results: data[queryPage],
        page: +queryPage,
        total_pages: length,
      });
    }
  }, subOption);
};

exports.getMovies = (req, res, next) => {
  responseMovies(req, res, "all");
};

exports.getTrending = (req, res, next) => {
  responseMovies(req, res, "trending");
};

exports.getTopRating = (req, res, next) => {
  responseMovies(req, res, "topRating");
};

exports.getByGenre = (req, res, next) => {
  const queryGenre = +req.query.genre;
  const queryPage = +req.query.page;

  if (!queryGenre)
    return res.status(400).send({ message: "Not found gerne params" });

  Genre.convertIdToName(queryGenre, (nameGenre) => {
    if (nameGenre === undefined)
      return res.status(400).send({ message: "Not found that genre id" });

    Movies["byGenre"]((data) => {
      const length = Object.keys(data).length;
      if (queryGenre && !queryPage) {
        res.status(200).send({
          results: data[1],
          page: 1,
          total_pages: length,
          genre_name: nameGenre,
        });
      }

      if (queryGenre && queryPage) {
        res.status(200).send({
          results: data[queryPage],
          page: queryPage,
          total_pages: length,
          genre_name: nameGenre,
        });
      }
    }, queryGenre);
  });
};

exports.getByKeyword = (req, res, next) => {
  const queryPage = req.query.page;
  const keyword = req.query.keyword;

  if (keyword === undefined || keyword === "" || keyword.trim() === "") {
    res.status(400).send({ message: "Not found keyword params" });
  } else {
    Movies.byKeyword((data) => {
      const length = Object.keys(data).length;
      if (!queryPage) {
        res.status(200).send({
          results: data[1],
          page: 1,
          total_pages: length,
        });
      } else {
        res.status(200).send({
          results: data[queryPage],
          page: +queryPage,
          total_pages: length,
        });
      }
    }, keyword);
  }
};

exports.getByQueries = (req, res, next) => {
  const queryPage = req.query.page ?? 1;

  const keyword = req.query.keyword;
  const genre = req.query.genre;
  const mediatype = req.query.mediatype;
  const year = req.query.year;

  if (keyword === undefined || keyword === "" || keyword.trim() === "") {
    res.status(400).send({ message: "Not found keyword params" });
  } else {
    Movies.byKeyword((dataPagination, data) => {
      // case 1: no genre, no mediatype, no year -> res by keyword
      if (!genre && !mediatype && !year) {
        const length = Object.keys(dataPagination).length;
        if (!queryPage) {
          res.status(200).send({
            results: dataPagination[1],
            page: 1,
            total_pages: length,
          });
        } else {
          res.status(200).send({
            results: dataPagination[queryPage],
            page: +queryPage,
            total_pages: length,
          });
        }
      }
      // case 2: have genre, no mediatype, no year -> res by keyword, genre
      if (genre && !mediatype && !year) {
        Movies.byGenreFromData(
          (dataByGenre) => {
            const length = Object.keys(dataByGenre).length;
            if (!queryPage) {
              res.status(200).send({
                results: dataByGenre[1],
                page: 1,
                total_pages: length,
              });
            } else {
              res.status(200).send({
                results: dataByGenre[queryPage],
                page: +queryPage,
                total_pages: length,
              });
            }
          },
          data,
          +genre
        );
      }

      // case 3: have genre, have mediatype, no year -> res by keyword, genre, mediatype
      if (genre && mediatype && !year) {
        Movies.byGenreFromData(
          (dataPagination, data) => {
            Movies.byMediaTypeFromData(
              (dataPagination, data) => {
                const length = Object.keys(dataPagination).length;
                if (!queryPage) {
                  res.status(200).send({
                    results: dataPagination[1],
                    page: 1,
                    total_pages: length,
                  });
                } else {
                  res.status(200).send({
                    results: dataPagination[queryPage],
                    page: +queryPage,
                    total_pages: length,
                  });
                }
              },
              data,
              mediatype
            );
          },
          data,
          +genre
        );
      }

      // case 4: have genre, no mediatype, have year -> res by keyword, genre, year
      if (genre && !mediatype && year) {
        Movies.byGenreFromData(
          (dataPagination, data) => {
            Movies.byYear(
              (dataPagination, data) => {
                const length = Object.keys(dataPagination).length;
                if (!queryPage) {
                  res.status(200).send({
                    results: dataPagination[1],
                    page: 1,
                    total_pages: length,
                  });
                } else {
                  res.status(200).send({
                    results: dataPagination[queryPage],
                    page: +queryPage,
                    total_pages: length,
                  });
                }
              },
              data,
              +year
            );
          },
          data,
          +genre
        );
      }

      // case 5: no genre, have mediatype, no year -> res by keyword, mediatype
      if (!genre && mediatype && !year) {
        Movies.byMediaTypeFromData(
          (dataPagination, data) => {
            const length = Object.keys(dataPagination).length;
            if (!queryPage) {
              res.status(200).send({
                results: dataPagination[1],
                page: 1,
                total_pages: length,
              });
            } else {
              res.status(200).send({
                results: dataPagination[queryPage],
                page: +queryPage,
                total_pages: length,
              });
            }
          },
          data,
          mediatype
        );
      }

      // case 6: no genre, no mediatype, have year -> res by keyword, year
      if (!genre && !mediatype && year) {
        Movies.byYear(
          (dataPagination, data) => {
            const length = Object.keys(dataPagination).length;
            if (!queryPage) {
              res.status(200).send({
                results: dataPagination[1],
                page: 1,
                total_pages: length,
              });
            } else {
              res.status(200).send({
                results: dataPagination[queryPage],
                page: +queryPage,
                total_pages: length,
              });
            }
          },
          data,
          +year
        );
      }

      // case 7: no genre, have mediatype, have year -> res by keyword, mediatype, year
      if (!genre && mediatype && year) {
        Movies.byMediaTypeFromData(
          (dataPagination, data) => {
            Movies.byYear(
              (dataPagination, data) => {
                const length = Object.keys(dataPagination).length;
                if (!queryPage) {
                  res.status(200).send({
                    results: dataPagination[1],
                    page: 1,
                    total_pages: length,
                  });
                } else {
                  res.status(200).send({
                    results: dataPagination[queryPage],
                    page: +queryPage,
                    total_pages: length,
                  });
                }
              },
              data,
              +year
            );
          },
          data,
          mediatype
        );
      }

      // case 8: have genre, have mediatype, have year -> res by keyword, genre, mediatype, year
      if (genre && mediatype && year) {
        Movies.byGenreFromData(
          (dataPagination, data) => {
            Movies.byMediaTypeFromData(
              (dataPagination, data) => {
                Movies.byYear(
                  (dataPagination, data) => {
                    const length = Object.keys(dataPagination).length;
                    if (!queryPage) {
                      res.status(200).send({
                        results: dataPagination[1],
                        page: 1,
                        total_pages: length,
                      });
                    } else {
                      res.status(200).send({
                        results: dataPagination[queryPage],
                        page: +queryPage,
                        total_pages: length,
                      });
                    }
                  },
                  data,
                  +year
                );
              },
              data,
              mediatype
            );
          },
          data,
          +genre
        );
      }
    }, keyword);
  }
};
