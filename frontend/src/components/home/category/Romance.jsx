import useFetch from "../../../hooks/use-fetch";
import GeneralList from "./GeneralList";

/* url fetch data romance movie, genre id - 10749 */
const url = "http://localhost:5000/api/movies/discover?genre=10749";

const Romance = () => {
  const { data, isLoaded } = useFetch(url);
  return (
    <>
      {isLoaded && (
        <GeneralList title="Romance" data={data} category="romance" />
      )}
    </>
  );
};

export default Romance;
