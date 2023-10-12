import React, { useState } from "react";
import "./header.css";
import { fetchSearchmovies, fetchMovies, fetchShows, fetchStreamingAvailability } from '../api/api';
import { Link } from "react-router-dom";

const Header = ({ onSearchResults, onMovies, onTVShows,onStreaming }) => {
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);

  let searchTimeout;

  const handleInputChange = (e) => {
    clearTimeout(searchTimeout);

    const newSearchText = e.target.value;
    setSearchText(newSearchText);
    setLoading(true);

    searchTimeout = setTimeout(() => {
      fetchSearchmovies(newSearchText)
        .then((results) => {
          const filteredResults = results.filter((movie) => movie.popularity > 5);
          setSuggestions(filteredResults);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching search results:', error);
          setLoading(false);
        });
    }, 500);
  };

  const handleSearchClick = async () => {
    setLoading(true);

    try {
      const results = await fetchSearchmovies(searchText);

      onSearchResults(results);

      const streamingData = await Promise.all(
        results.slice(0, 20).map((movie) => fetchStreamingAvailability(movie.id))
      );

      setStreamingInfo(streamingData);
      onStreaming(streamingData)

      setLoading(false);
    } catch (error) {
      console.error('Error fetching search results:', error);
      setLoading(false);
    }
  };


  const handleMovieClick = () => {
    setLoading(true);
    console.log(`movies button clicked`);
    fetchMovies()
      .then((results) => {
        onMovies(results);
        console.log('we are in header movie');
        console.log(results);
        setLoading(false);
      })
      .catch((error) => {
        console.error(`Error fetching Movies results: `, error);
        setLoading(false);
      });
  }

  const handleShowsClick = () => {
    setLoading(true);
    console.log(`shows button clicked`);
    fetchShows()
      .then((results) => {
        onTVShows(results);
        console.log('we are in header shows');
        console.log(results);
        setLoading(false);
      })
      .catch((error) => {
        console.error(`Error fetching Movies results: `, error);
        setLoading(false);
      });
  }

  const handleSuggestionClick = (suggestion) => {
    setSearchText(suggestion.title);
    setSuggestions([]);
    handleSearchClick();
  };

  return (
    <div>
      <nav>
        <a href="/" className="logo">
          <img src="icons/moviesflix.jpg" alt="Logo" />
        </a>
        <ul className="menu">
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <Link to="/movie">
              <a onClick={handleMovieClick} handleMovieClick={handleMovieClick}>
                Movie
              </a>
            </Link>
          </li>
          <li>
            <Link to="/tvshow">
              <a onClick={handleShowsClick} handleShowsClick={handleShowsClick}>
                TV Shows
              </a>
            </Link>
          </li>
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
      {suggestions.length > 0 ? (
        <ul className="suggestions">
          {loading ? (
            <li>Loading...</li>
          ) : (
            suggestions.map((suggestion, index) => (
              <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
                {suggestion.title || suggestion.name}
              </li>
            ))
          )}
        </ul>
      ) : null}
      <Link to="/search">
        <button onClick={handleSearchClick}>Search</button>
      </Link>
    </div>
  );
};

export default Header;