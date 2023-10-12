import React, { useState } from "react";
import Header from "./components/header/header";
import Carousel from "./components/Carousel";
import MovieCard from "./components/main";
import Footer from "./components/footer/footer";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import SearchResult from './components/search/searchresults';
import MovieResult from "./components/movie/movieresults";
import ShowResults from "./components/movie/tvShow";

function App() {

  const [searchResults, setSearchResults] = useState([]);
  const [movies, setMovies] = useState([]);
  const [shows, setTVShows] = useState([]);

  return (
    <Router>
      <div className="root">
        <Header onSearchResults={setSearchResults} onMovies={setMovies} onTVShows={setTVShows}/>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/search" render={() => {
            console.log("Rendering SearchResult component");
            return <SearchResult searchResults={searchResults} />;
          }} />
          <Route path="/movie" render={() => {
            console.log("Rendering Movies");
            return <MovieResult movieResults={movies}/>;
          }} />
          <Route path="/tvshow" render={() => {
            console.log("Rendering Shows");
            return <ShowResults showResults={shows}/>;
          }} />
        </Switch>
        <Footer className="footer" />
      </div>
    </Router>
  );
}

function Home() {
  return (
    <>
      <Carousel className="carousel" />
      <MovieCard />
    </>
  );
}

export default App;
