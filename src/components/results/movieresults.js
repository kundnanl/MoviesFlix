import React, { useState, useEffect } from 'react';
import "../style/main.css"

const genreMapping = {
  12: 'Adventure',
  16: 'Animation',
  35: 'Comedy',
  28: 'Action',
  80: 'Crime',
  99: 'Documentary',
  18: 'Drama',
  10751: 'Family',
  14: 'Fantasy',
  36: 'History',
  27: 'Horror',
  10402: 'Music',
  9648: 'Mystery',
  10749: 'Romance',
  878: 'Science Fiction',
  10770: 'TV Movie',
  53: 'Thriller',
  10753: 'War',
  37: 'Western',
};

const MovieResult = ({ movieResults }) => {
  console.log(movieResults);
  const [showFullOverview, setShowFullOverview] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (movieResults.length > 0) {
      setLoading(false); 
    }
  }, [movieResults]);


  const toggleOverview = (index) => {
    const updatedShowFullOverview = [...showFullOverview];
    updatedShowFullOverview[index] = !updatedShowFullOverview[index];
    setShowFullOverview(updatedShowFullOverview);
  };

  const filteredResults = movieResults.filter((movie) => movie.popularity > 5);

  return (
    <div>
      <h2>Movies RESULTS</h2>
      {loading ? (
        <span class="loader"></span>
      ) : (
        <div className="movie-results container">
          {filteredResults && filteredResults.map((movie, index) => (
            <div className="search-results movie-card" key={index}>
              <div className="movie-header" style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w300${movie.poster_path})` }}>
              </div>
              <div className="movie-content">
                <div className="movie-content-header">
                  <a href="/name">
                    <h3 className="movie-title">{movie.title || 'No Title'}</h3>
                  </a>
                  <div className="imax-logo"></div>
                </div>
                <div className="movie-info">
                  <div className="info-section">
                    <label>Release Date</label>
                    <span>{movie.release_date || 'Unknown'}</span>
                  </div>
                  <div className="info-section">
                    <label>Ratings</label>
                    <span>{movie.vote_average || 'N/A'}</span>
                  </div>
                  <div className="info-section">
                    <label>Genres</label>
                    <span>
                      {movie.genre_ids &&
                        movie.genre_ids.map((genreId) => (
                          <span key={genreId}>
                            {genreMapping[genreId] || 'Unknown'}
                          </span>
                        ))}
                    </span>
                  </div>
                </div>
              </div>
              <div className="movie-content">
                <p className="movie-overview">
                  {movie.overview
                    ? showFullOverview[index]
                      ? movie.overview
                      : `${movie.overview.slice(0, 150)}...`
                    : 'No overview available'}
                  {movie.overview && movie.overview.length > 150 && (
                    <span className="see-more" onClick={() => toggleOverview(index)}>
                      {showFullOverview[index] ? "See Less" : "See More"}
                    </span>
                  )}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MovieResult;
