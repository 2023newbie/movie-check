import useFetch from "../../../hooks/use-fetch";
import GeneralList from "./GeneralList";

/* url fetch data comedy movie, genre id - 35 */
const url = "http://localhost:5000/api/movies/discover?genre=35";

const Comedy = () => {
  const { data, isLoaded } = useFetch(url);
  return (
    <>
      {isLoaded && (
        <GeneralList title="Comedy" data={data} category="comedy" />
      )}
    </>
  );
};

export default Comedy;
