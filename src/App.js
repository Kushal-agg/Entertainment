import "./App.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import Header from "./Components/Header";
import TVShows from "./Components/TVShows";
import Movies from "./Components/movies";
import Home from "./Components/Home";
import Search from "./Components/Search";
import TrendingMovies from "./Components/TrendingMovies";
import TrendingShows from "./Components/TrendingShows";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tvshows" element={<TVShows />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/search" element={<Search />} />
        <Route path="/home/trendingmovies" element={<TrendingMovies />} />
        <Route path="/home/trendingshows" element={<TrendingShows />} />
      </Routes>
    </Router>
  );
}

export default App;
