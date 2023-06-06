import React, { useState } from "react";
import classes from "./Navigation.module.css";
import { Link } from "react-router-dom";
import SearchIcon from "./SearchIcon";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  const bcBlack = isScrolled && classes.bcBlack;

  const checkScrollY = () => {
    if (window.scrollY >= 100) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  window.addEventListener("scroll", checkScrollY);

  return (
    <div className={`${classes.nav} ${bcBlack}`}>
      <Link to="/" className={classes.logo}>
        Movie App
      </Link>
      <Link to="/search" className={classes.searchBtn}>
        <SearchIcon />
      </Link>
    </div>
  );
};

export default Navigation;
