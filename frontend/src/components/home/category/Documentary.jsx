import useFetch from "../../../hooks/use-fetch";
import GeneralList from "./GeneralList";

/* url fetch data documentary movie, genre id - 99 */
const url = "http://localhost:5000/api/movies/discover?genre=99";

const Documentary = () => {
  const { data, isLoaded } = useFetch(url);
  return (
    <>
      {isLoaded && (
        <GeneralList title="Documentary" data={data} category="documentary" />
      )}
    </>
  );
};

export default Documentary;
