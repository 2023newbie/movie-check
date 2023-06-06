import classes from "./Banner.module.css";
import useFetch from "../../hooks/use-fetch";

const ROOT_IMAGE = "https://image.tmdb.org/t/p/original";
const url = 'http://localhost:5000/api/movies/'

const getRandomItemInArray = (data) => {
    const dataLength = data.results.length;
    const randomIndex = Math.floor(Math.random() * (dataLength - 1));
    const randomData = data.results[randomIndex];
    return randomData
}

const Banner = () => {
  const {data, isLoaded} = useFetch(url, getRandomItemInArray)
  const title = data.title || data.name;

  return (
    <>
      {isLoaded && (
        <div className={classes.banner} style={{ backgroundImage: `url(${ROOT_IMAGE}${data.backdrop_path})` }}>
          <div className={classes.titleWrap}>
            <h1>{title}</h1>
            <div>
              <button>Play</button>
              <button className={classes.btnRight}>My List</button>
            </div>
            <p>{data.overview}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default Banner;
