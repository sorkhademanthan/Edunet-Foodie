import React from "react";
import { Link } from "react-router-dom";
import { FaSearch, FaUserCircle } from "react-icons/fa";

const TopBar = () => {
  return (
    <header className="topBarSection">
      <div className="companyTitle">
        <Link to="/" className="link">
          <h1 className="brandName">🍔 FOODIE</h1>
        </Link>
      </div>

      <div className="searchBar">
        <input
          type="text"
          placeholder="Search for food, restaurants..."
          className="searchInput"
        />
        <button className="searchBtn">
          <FaSearch />
        </button>
      </div>

      <div className="userAuth">
        <Link to="/login" className="authLink">
          <FaUserCircle className="userIcon" /> Login / Sign Up
        </Link>
      </div>
    </header>
  );
};

export default TopBar;
