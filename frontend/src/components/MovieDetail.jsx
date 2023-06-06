import classes from "./MovieDetail.module.css";

const ROOT_IMAGE = "https://image.tmdb.org/t/p/original";

const MovieDetail = ({data}) => {
  const imgElement = (
    <img
      src={`${ROOT_IMAGE}${data["backdrop_path"]}`}
      alt={data.title}
      width="100%"
      height="400px"
    />
  );

  const iframeElement = (
    <iframe
      width="100%"
      height="400"
      title={data.title}
      className={classes.video}
      src={`https://www.youtube.com/embed/${data.key}`}
    ></iframe>
  );

  const releaseDate = data["release_date"] || data["first_air_date"]

  return (
    <div className={classes.detailWrap}>
      <div>
        <h1>{data.title || data.name}</h1>
        <hr />
        <p className={classes.bold}>
          Release Date: {releaseDate}
        </p>
        <p className={classes.bold}>Vote: {data["vote_average"]}</p>
        <p>{data.overview}</p>
      </div>
      <div>
        {!data.key && imgElement}
        {data.key && iframeElement}
      </div>
    </div>
  );
};

export default MovieDetail;
