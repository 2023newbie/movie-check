import useFetch from "../../../hooks/use-fetch";
import GeneralList from "./GeneralList";

/* url fetch data trending */
const url = "http://localhost:5000/api/movies/trending";

const Trending = () => {
  const { data, isLoaded } = useFetch(url);

  return (
    <>
      {isLoaded && (
        <GeneralList title="Trending" data={data} category="trending" />
      )}
    </>
  );
};

export default Trending;
