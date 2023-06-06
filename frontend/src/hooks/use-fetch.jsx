import { useEffect, useState } from "react";
import { json } from "react-router-dom";

const user = {
  userid: "User 01",
  token: "8qlOkxz4wq",
};

// receive url + 1 func, fetch data by url, edit data by func. Finally, send out
// cb haves to declare outside component func or use useCallback before add as argument
const useFetch = (url, cb) => {
  const [data, setData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const fetchDataHandler = async () => {
      const response = await fetch(url, {
        method: "GET",
        headers: user,
      });
      if (!response.ok)
        throw json({ message: "Could not fetch data." }, { status: 500 });
      const data = await response.json();

      // if there are callback, give result, return
      if (cb) {
        const finalResult = cb(data);
        setData(finalResult);

      // else return data fetch
      } else {
        setData(data.results);
      }
      setIsLoaded(true);
    };
    fetchDataHandler();
  }, [url, cb]);

  return { data, isLoaded };
};

export default useFetch;
