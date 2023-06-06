import useFetch from "../../../hooks/use-fetch";
import GeneralList from "./GeneralList";

/* url fetch data action movie, genre id - 28 */
const url = "http://localhost:5000/api/movies/discover?genre=28";

const Action = () => {
  const { data, isLoaded } = useFetch(url);
  return (
    <>
      {isLoaded && (
        <GeneralList title="Action" data={data} category="action" />
      )}
    </>
  );
};

export default Action;
