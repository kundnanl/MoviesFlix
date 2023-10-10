import React, { useState } from "react";
import "./header.css";
import { fetchSearchmovies } from '../api/api';
import { Link } from "react-router-dom";

const Header = ({ onSearchResults }) => {
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false); // Set loading to false initially
  const [suggestions, setSuggestions] = useState([]);

  let searchTimeout;

  const handleInputChange = (e) => {
    clearTimeout(searchTimeout); // Clear any existing timeout

    const newSearchText = e.target.value;
    setSearchText(newSearchText);
    setLoading(true);

    // Set a new timeout to trigger the search after 500 milliseconds
    searchTimeout = setTimeout(() => {
      fetchSearchmovies(newSearchText)
        .then((results) => {
          const filteredResults = results.filter((movie) => movie.popularity > 10);
          setSuggestions(filteredResults);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching search results:', error);
          setLoading(false);
        });
    }, 500);
  };

  const handleSearchClick = () => {
    setLoading(true);

    fetchSearchmovies(searchText)
      .then((results) => {
        onSearchResults(results); 
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching search results:', error);
        setLoading(false);
      });
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchText(suggestion.title);
    setSuggestions([]); // Clear suggestions
    handleSearchClick();
  };

  return (
    <div>
      <nav>
        <a href="#" className="logo">
          <img src="icons/logo.png" alt="Logo" />
        </a>
        <ul className="menu">
          <li><a href="/">Home</a></li>
          <li><a href="#">Movie</a></li>
          <li><a href="#">TV Show</a></li>
          <li><a href="#">Hollywood</a></li>
          <li><a href="#">Horror</a></li>
        </ul>
        <Search
          searchText={searchText}
          suggestions={suggestions}
          loading={loading}
          handleInputChange={handleInputChange}
          handleSearchClick={handleSearchClick}
          handleSuggestionClick={handleSuggestionClick}
        />
      </nav>
    </div>
  );
};

export const Search = ({ searchText, suggestions, loading, handleInputChange, handleSearchClick, handleSuggestionClick }) => {
  return (
    <div className="search">
      <input
        type="text"
        placeholder="Find Your Favourite Movie"
        value={searchText}
        onChange={handleInputChange}
      />
      {loading && <p>Loading...</p>}
      {suggestions.length > 0 && (
        <ul className="suggestions">
          {suggestions.map((suggestion, index) => (
            <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
              {suggestion.title}
            </li>
          ))}
        </ul>
      )}
      <Link to="/search">
        <button onClick={handleSearchClick}>Search</button>
      </Link>
    </div>
  );
};

export default Header;
