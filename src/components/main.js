import React, { useState, useEffect } from 'react';
import "./style/main.css";
import { fetchSomeMovies, fetchStreamingAvailability } from './api/api';

function MovieCard() {
    const [someMovies, setSomeMovies] = useState([]);
    const [showFullOverview, setShowFullOverview] = useState([]);
    const [streamingInfo, setStreamingInfo] = useState([]);

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
        37: 'Western'
    };

    useEffect(() => {
        fetchSomeMovies()
            .then(async (movies) => {
                setSomeMovies(movies.slice(0, 20));
                setShowFullOverview(new Array(20).fill(false));

                // Fetch streaming availability data for each movie
                const streamingData = await Promise.all(
                    movies.slice(0, 20).map((movie) => fetchStreamingAvailability(movie.id))
                );

                setStreamingInfo(streamingData);
            })
            .catch((error) => {
                console.error('Error fetching latest movies:', error);
            });
    }, []);

    const toggleOverview = (index) => {
        const updatedShowFullOverview = [...showFullOverview];
        updatedShowFullOverview[index] = !updatedShowFullOverview[index];
        setShowFullOverview(updatedShowFullOverview);
    };

    return (
        <div className="container">
            {someMovies && someMovies.map((movie, index) => (
                <div className="movie-card" key={index}>
                    <div className="movie-header" style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w300${movie.poster_path})` }}>
                    </div>
                    <div className="movie-content">
                        <div className="movie-content-header">
                            <a href="/name">
                                <h3 className="movie-title">{movie.title}</h3>
                            </a>
                            <div className="imax-logo"></div>
                        </div>
                        <div className="movie-info">
                            <div className="info-section">
                                <label>Release Date</label>
                                <span>{movie.release_date}</span>
                            </div>
                            <div className="info-section">
                                <label>Ratings</label>
                                <span>{movie.vote_average}</span>
                            </div>
                            <div className="info-section">
                                <label>Genres</label>
                                <span>
                                    {movie.genre_ids.map((genreId) => (
                                        <span key={genreId}>
                                            {genreMapping[genreId]}
                                        </span>
                                    ))}
                                </span>
                            </div>
                            <div className="info-section">
                            <label>Streaming Service</label>
                            <span>
                                {streamingInfo[index] ? (
                                    streamingInfo[index].service
                                ) : (
                                    'Not available'
                                )}
                            </span>
                        </div>
                        <div className="info-section">
                            <label>Streaming Link</label>
                            <span>
                                {streamingInfo[index] ? (
                                    <a href={streamingInfo[index].link} target="_blank" rel="noopener noreferrer">
                                        Watch on {streamingInfo[index].service}
                                    </a>
                                ) : (
                                    'N/A'
                                )}
                            </span>
                        </div>
                        </div>
                    </div>
                    <div className="movie-content">
                        <p className="movie-overview">
                            {showFullOverview[index]
                                ? movie.overview
                                : `${movie.overview.slice(0, 150)}...`}
                            {movie.overview.length > 150 && (
                                <span className="see-more" onClick={() => toggleOverview(index)}>
                                    {showFullOverview[index] ? "See Less" : "See More"}
                                </span>
                            )}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default MovieCard;