import classes from "./SearchForm.module.css";
import SearchIcon from "../SearchIcon";
import { Form, Link } from "react-router-dom";
import { useEffect, useState } from "react";

const user = {
  userid: "User 01",
  token: "8qlOkxz4wq",
}; // data require when fetch

const getSearchEnhanceList = async () => {
  const response = await fetch("http://localhost:5000/searchfielddata", {
    method: "GET",
    headers: user,
  });
  const data = await response.json();
  return data;
};

const SearchForm = () => {
  const [enteredInput, setEnteredInput] = useState("");
  const [enhanceSearchData, setEnhanceSearchData] = useState({
    genres: [],
    mediaTypes: [],
  });

  useEffect(() => {
    getSearchEnhanceList().then((data) => setEnhanceSearchData(data));
  }, []);

  return (
    <Form method="POST" className={classes.formWrap}>
      <input
        type="text"
        placeholder="Name your film"
        name="keyword"
        value={enteredInput}
        onChange={(e) => setEnteredInput(e.target.value)}
      />
      <SearchIcon />

      <select name="genre" id="genres">
        <option value=''>Choose a genre</option>
        {enhanceSearchData.genres.map((genre) => {
          return <option key={genre.id} value={genre.id}>{genre.name}</option>;
        })}
      </select>

      <select name="mediatype" id="mediaTypes">
        <option value=''>Choose a type of media</option>
        {enhanceSearchData.mediaTypes.map((mediaType) => {
          return <option key={mediaType} value={mediaType}>{mediaType}</option>;
        })}
      </select>

      <select name="year" id="year">
        <option value=''>Choose a released year </option>
        <option value="2020">2020</option>
        <option value="2021">2021</option>
        <option value="2022">2022</option>
        <option value="2023">2023</option>
      </select>

      <div>
        <Link className={classes.resetBtn} to="/search">
          RESET
        </Link>
        <button
        type="submit"
          className={classes.searchBtn}
        >
          SEARCH
        </button>
      </div>
    </Form>
  );
};

export default SearchForm;
