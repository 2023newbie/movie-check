import useFetch from "../../../hooks/use-fetch";
import GeneralList from "./GeneralList";

/* url fetch data top rating */
const url = "http://localhost:5000/api/movies/toprating";

const TopRating = () => {
  const { data, isLoaded } = useFetch(url);
  return (
    <>
      {isLoaded && (
        <GeneralList title="Top Rating" data={data} category="topRating" />
      )}
    </>
  );
};

export default TopRating;
