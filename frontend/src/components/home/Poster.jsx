import classes from "./Poster.module.css";
import useFetch from "../../hooks/use-fetch";

const ROOT_IMAGE = "https://image.tmdb.org/t/p/original";
const url = 'http://localhost:5000/api/movies/'

const get10ItemInArray = (data) => {
    const posterList = data.results.splice(10)
    return posterList
}

const Poster = ({ user }) => {
    const {data, isLoaded} = useFetch(url, get10ItemInArray)

  return (
    <>
      {isLoaded && (
        <div className={classes.trendWrap}>
          <div className={classes.list}>
            {data.map((movie) => (
              <div
                key={movie.id}
                className={classes.filmPoster}
                style={{
                  backgroundImage: `url(${ROOT_IMAGE}${movie.poster_path})`,
                }}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Poster;
