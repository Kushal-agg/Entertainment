import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Home.scss";
import Banner from "./banner";
import Footer from "./Footer";
import { BiLinkExternal } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const apiKey = "14af83f372fe18ca097a8721d92b7145";
const imgUrl = "https://image.tmdb.org/t/p/original";

const Home = () => {
  const navigate = useNavigate();
  const [movies, setMovie] = useState([]);
  const [tv, setTv] = useState([]);

  const [loading, setLoading] = useState(true);
  const page = Math.floor(Math.random() * 10) + 1;
  useEffect(() => {
    const fetchMovies = async () => {
      const response = await axios.get(
        `https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKey}&include_adult=false&page=${page}`
      );
      const res = response.data.results
        .filter((item) => item.poster_path !== null)
        .filter(
          (item, index, self) =>
            index === self.findIndex((m) => m.id === item.id)
        );
      setMovie(res);
    };
    const fetchTvShows = async () => {
      const response = await axios.get(
        `https://api.themoviedb.org/3/trending/tv/day?api_key=${apiKey}&include_adult=false&page=${page}`
      );
      const res = response.data.results
        .filter((item) => item.poster_path !== null)
        .filter(
          (item, index, self) =>
            index === self.findIndex((m) => m.id === item.id)
        );

      setTv(res);
    };
    fetchMovies();
    fetchTvShows();
  }, []);

  const uniqueItems = [...movies, ...tv];

  return (
    <div className="home-page">
      <Banner items={uniqueItems} />

      <section className="recommended-section" style={{ marginTop: "10px" }}>
        <div className="recommended">
          <div className="view">
            <h2>Trending Movies</h2>
          </div>
          <div className="scrollable-row">
            {movies.map((item, index) => (
              <Link
                to={`/home/movies/${item.id}`}
                key={index}
                className="poster-item"
              >
                <img src={`${imgUrl}/${item.poster_path}`} alt={item.title} />
              </Link>
            ))}
            <div className="view-all">
              <Link to="/home/trendingmovies">
                <div className="icon-container">
                  <BiLinkExternal className="icon" />
                  <span className="overlay-text">View All</span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section className="recommended-section">
        <div className="recommended">
          <div className="view">
            <h2>Trending TV Shows</h2>
          </div>
          <div className="scrollable-row">
            {tv.map((item, index) => (
              <Link
                to={`/home/tvshows/${item.id}`}
                key={index}
                className="poster-item"
              >
                <img src={`${imgUrl}/${item.poster_path}`} alt={item.title} />
              </Link>
            ))}
            <div className="view-all">
              <Link to="/home/trendingshows">
                <div className="icon-container">
                  <BiLinkExternal className="icon" />
                  <span className="overlay-text">View All</span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
