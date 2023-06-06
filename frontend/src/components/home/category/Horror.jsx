import useFetch from "../../../hooks/use-fetch";
import GeneralList from "./GeneralList";

/* url fetch data horror movie, genre id - 27 */
const url = "http://localhost:5000/api/movies/discover?genre=27";

const Horror = () => {
  const { data, isLoaded } = useFetch(url);
  return (
    <>
      {isLoaded && (
        <GeneralList title="Horror" data={data} category="horror" />
      )}
    </>
  );
};

export default Horror;
