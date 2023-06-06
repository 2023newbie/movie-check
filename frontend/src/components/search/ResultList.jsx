import { useDispatch, useSelector } from "react-redux";
import classes from "./ResultList.module.css";
import MovieDetail from "../MovieDetail";
import { detailMovieSearchActions } from "../../store/detail-movie-search-slice";

const ROOT_IMAGE = "https://image.tmdb.org/t/p/original";

const user = {
  userid: "User 01",
  token: "8qlOkxz4wq",
}; // data require when fetch

const ResultList = ({ data }) => {
  const isArray = Array.isArray(data);
  const dispatch = useDispatch()
  const isShow = useSelector(state => state.detailMovieSearch.isShow)
  const dataShow = useSelector(state => state.detailMovieSearch.data)

  const getMovieKeyThenDispatchData = async (movie) => {
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
        detailMovieSearchActions.control(movie)
      );
    }

    // if fetch ok, add key youtube to object data, then dispatch
    const dataVideoMovie = await response.json();
    const data = { ...movie, key: dataVideoMovie.key };
    dispatch(detailMovieSearchActions.control(data));
  };

  if (isArray) {
    return (
      <>
        {isShow && <MovieDetail data={dataShow} />}
        <div className={classes.listWrap}>
          <h3>Search Result</h3>
          <div className={classes.container}>
            {data.map((movie, index) => (
              <div key={index} className={classes.movie} onClick={() => {
                getMovieKeyThenDispatchData(movie)
              }}>
                <img
                  src={`${ROOT_IMAGE}${movie["poster_path"]}`}
                  alt={movie.name || movie.title}
                  width="95px"
                  height="160px"
                />
              </div>
            ))}
          </div>
        </div>
      </>
    );
  } else {
    return <p className={classes.message}>{data.message}</p>;
  }
};

export default ResultList;
