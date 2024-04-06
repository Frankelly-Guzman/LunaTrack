// SearchBar.jsx
import React, { useState } from "react";
import "./SearchBar.css";

const SearchBar = ({ onSearch }) => {
  const [city, setCity] = useState("");
  const [state, setState] = useState("");

  // Function to handle city input change
  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  // Function to handle state input change
  const handleStateChange = (event) => {
    setState(event.target.value);
  };

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    onSearch(city.trim(), state.trim()); // Pass city and state to parent component
  };

  return (
    <div className="search-bar">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={handleCityChange}
          required
        />
        <input
          type="text"
          placeholder="Enter state"
          value={state}
          onChange={handleStateChange}
          required
        />
        <button type="submit">Search</button>
      </form>
    </div>
  );
};

export default SearchBar;
