import "./App.scss";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import React from "react";
import Header from "./Components/Header";
import TVShows from "./Components/TVShows";
import Movies from "./Components/movies";
import Home from "./Components/Home";
import Search from "./Components/Search";
import TrendingMovies from "./Components/TrendingMovies";
import TrendingShows from "./Components/TrendingShows";
import MoviesPage from "./Components/MoviesPage";
import TvPage from "./Components/TvPage";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<Home />} />
        <Route path="/tvshows" element={<TVShows />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/search" element={<Search />} />
        <Route path="/home/trendingmovies" element={<TrendingMovies />} />
        <Route path="/home/trendingshows" element={<TrendingShows />} />
        <Route path="/home/movies/:id" element={<MoviesPage />} />
        <Route path="/home/tvshows/:id" element={<TvPage />} />
        <Route path="/movies/:id" element={<MoviesPage />} />
        <Route path="/tvshows/:id" element={<TvPage />} />
        <Route path="/search/movies/:id" element={<MoviesPage />} />
        <Route path="/search/tvshows/:id" element={<TvPage />} />
      </Routes>
    </Router>
  );
}

export default App;
