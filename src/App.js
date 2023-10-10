import React, { useState } from "react";
import Header from "./components/header/header";
import Carousel from "./components/Carousel";
import MovieCard from "./components/main";
import Footer from "./components/footer/footer";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import SearchResult from './components/search/searchresults';

function App() {

  const [searchResults, setSearchResults] = useState([]);

  return (
    <Router>
      <div className="root">
        <Header onSearchResults={setSearchResults} />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/search" render={() => {
            console.log("Rendering SearchResult component");
            return <SearchResult searchResults={searchResults} />;
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
