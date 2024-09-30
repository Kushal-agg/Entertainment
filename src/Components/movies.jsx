import React, { useEffect, useState, useRef } from "react";
import "./Home.scss";
import MovieDialog from "./moviesModal";
import axios from "axios";
import { BiPlay } from "react-icons/bi";
import { AiOutlinePlus } from "react-icons/ai";
import Footer from "./Footer";
import Row from "./Row";
import Banner from "./banner";

const apiKey = "14af83f372fe18ca097a8721d92b7145";
const url = "https://api.themoviedb.org/3";
const imgUrl = "https://image.tmdb.org/t/p/original";

const Movies = () => {
  const [upComing, setUpComing] = useState([]);
  const [nowPlaying, setNowPlaying] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [upComingPage, setUpComingPage] = useState(1);
  const [nowPlayingPage, setNowPlayingPage] = useState(1);
  const [popularPage, setPopularPage] = useState(1);
  const [topRatedPage, setTopRatedPage] = useState(1);

  useEffect(() => {
    const fetchUpcoming = async () => {
      const response = await axios.get(
        `${url}/movie/upcoming?api_key=${apiKey}&include_adult=false&page=${upComingPage}`
      );
      const res = response.data.results.filter(
        (item) => item.poster_path !== null
      );
      setUpComing((prev) =>
        [...prev, ...res].filter(
          (item, index, self) =>
            index === self.findIndex((m) => m.id === item.id)
        )
      );
    };
    fetchUpcoming();
  }, [upComingPage]);

  useEffect(() => {
    const fetchNowPlaying = async () => {
      const response = await axios.get(
        `${url}/movie/now_playing?api_key=${apiKey}&include_adult=false&page=${nowPlayingPage}`
      );
      const res = response.data.results.filter(
        (item) => item.poster_path !== null
      );
      setNowPlaying((prev) =>
        [...prev, ...res].filter(
          (item, index, self) =>
            index === self.findIndex((m) => m.id === item.id)
        )
      );
    };
    fetchNowPlaying();
  }, [nowPlayingPage]);

  useEffect(() => {
    const fetchPopular = async () => {
      const response = await axios.get(
        `${url}/movie/popular?api_key=${apiKey}&include_adult=false&page=${popularPage}`
      );
      const res = response.data.results.filter(
        (item) => item.poster_path !== null
      );
      setPopularMovies((prev) =>
        [...prev, ...res].filter(
          (item, index, self) =>
            index === self.findIndex((m) => m.id === item.id)
        )
      );
    };
    fetchPopular();
  }, [popularPage]);

  useEffect(() => {
    const fetchTopRated = async () => {
      const response = await axios.get(
        `${url}/movie/top_rated?api_key=${apiKey}&include_adult=false&page=${topRatedPage}`
      );
      const res = response.data.results.filter(
        (item) => item.poster_path !== null
      );
      setTopRated((prev) =>
        [...prev, ...res].filter(
          (item, index, self) =>
            index === self.findIndex((m) => m.id === item.id)
        )
      );
    };
    fetchTopRated();
  }, [topRatedPage]);

  const handleClick = (movie) => {
    setSelectedMovie(movie);
  };

  const handleCloseDialog = () => {
    setSelectedMovie(null);
  };

  const umovie = [...nowPlaying, ...popularMovies, ...topRated, ...upComing]
    .filter((item) => item.poster_path !== null)
    .filter(
      (movie, index, self) => index === self.findIndex((m) => m.id === movie.id)
    );

  return (
    <section>
      <Banner items={umovie} />

      <Row
        title={"Upcoming"}
        arr={upComing}
        onClick={handleClick}
        onScrollEnd={() => setUpComingPage((page) => page + 1)}
      />
      <Row
        title={"Now Playing"}
        arr={nowPlaying}
        onClick={handleClick}
        onScrollEnd={() => setNowPlayingPage((page) => page + 1)}
      />
      <Row
        title={"Popular Movies"}
        arr={popularMovies}
        onClick={handleClick}
        onScrollEnd={() => setPopularPage((page) => page + 1)}
      />
      <Row
        title={"Top Rated"}
        arr={topRated}
        onClick={handleClick}
        onScrollEnd={() => setTopRatedPage((page) => page + 1)}
      />

      {selectedMovie && (
        <MovieDialog movie={selectedMovie} onClose={handleCloseDialog} />
      )}

      <Footer />
    </section>
  );
};

export default Movies;
