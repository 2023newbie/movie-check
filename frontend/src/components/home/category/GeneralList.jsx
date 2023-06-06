import React from "react";
import classes from "./GeneralList.module.css";
import { useDispatch, useSelector } from "react-redux";
import { detailMovieActions } from "../../../store/detail-movie-slice";
import MovieDetail from "../../MovieDetail";

const ROOT_IMAGE = "https://image.tmdb.org/t/p/original"; // domain address image

const user = {
  userid: "User 01",
  token: "8qlOkxz4wq",
}; // data require when fetch

const GeneralList = ({ data, title, category }) => {
  const dispatch = useDispatch();
  const isShow = useSelector((state) => state.detailMovie.isShow[category]);
  const dataToShow = useSelector((state) => state.detailMovie.data[category]);

  const getMovieKeyThenDispatchData = async (movie, category) => {
    const response = await fetch(
      "http://localhost:5000/api/movies/video/" + movie.id,
      {
        method: "GET",
        headers: user,
      }
    );

    // if fetch go wrong, dispatch data not key
    if (!response.ok) {
      return dispatch(
        detailMovieActions.control({ data: { ...movie }, category: category })
      );
    }

    // if fetch ok, add key youtube to object data, then dispatch
    const dataVideoMovie = await response.json();
    const data = { ...movie, key: dataVideoMovie.key };
    dispatch(detailMovieActions.control({ data: data, category: category }));
  };
  return (
    <div className={classes.trendWrap}>
      <h3>{title}</h3>
      <div className={classes.list}>
        {data.map((movie) => (
          <div
            key={movie.id}
            className={classes.filmBackdrop}
            onClick={() => {
              getMovieKeyThenDispatchData(movie, category);
            }}
          >
            <img
              src={`${ROOT_IMAGE}${movie["backdrop_path"]}`}
              alt={movie.title || movie.name}
              width="200px"
              height="100px"
            />
          </div>
        ))}
      </div>
      {isShow && <MovieDetail data={dataToShow} />}
    </div>
  );
};

export default GeneralList;
