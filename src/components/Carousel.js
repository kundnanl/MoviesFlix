import React, { useEffect, useState } from "react";
import "./style/Carousel.css";
import { fetchLatestMovies } from "./api/api";

function Carousel() {
  const [current, setCurrent] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const [latestMovies, setLatestMovies] = useState([]);
  let timeOut = null;

  useEffect(() => {
    fetchLatestMovies()
      .then((movies) => {
        setLatestMovies(movies.slice(0, 6));
      })
      .catch((error) => { 
        console.error('Error fetching latest movies:', error);
      });

    timeOut =
      autoPlay &&
      setTimeout(() => {
        slideRight();
      }, 2500);
  });

  const slideRight = () => {
    setCurrent(current === latestMovies.length - 1 ? 0 : current + 1);
  };

  const slideLeft = () => {
    setCurrent(current === 0 ? latestMovies.length - 1 : current - 1);
  };

  return (
    <div
      className="carousel"
      onMouseEnter={() => {
        setAutoPlay(false);
        clearTimeout(timeOut);
      }}
      onMouseLeave={() => {
        setAutoPlay(true);
      }}
    >
      <div className="carousel-text">
        <h2>Movies Flix</h2>
        <p>
          Welcome to the seamless movies experience which shows you the latest
          movies and allows search capabilities to enhance the movie experience.
        </p>

      </div>
      <div className="carousel_wrapper">
        {latestMovies.map((movie, index) => {
          return (
            <div
              key={index}
              className={
                index === current
                  ? "carousel_card carousel_card-active"
                  : "carousel_card"
              }
            >
              <img
                className="card_image"
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
              />
            </div>
          );
        })}
        <div className="carousel_arrow_left" onClick={slideLeft}>
          &lsaquo;
        </div>
        <div className="carousel_arrow_right" onClick={slideRight}>
          &rsaquo;
        </div>
        <div className="carousel_pagination">
          {latestMovies.map((_, index) => {
            return (
              <div
                key={index}
                className={
                  index == current
                    ? "pagination_dot pagination_dot-active"
                    : "pagination_dot"
                }
                onClick={() => setCurrent(index)}
              ></div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Carousel;