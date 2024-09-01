import React, { useEffect, useState } from "react";
import "./Home.scss";
import MovieDialog from "./moviesdialogbox";
import axios from "axios";
import { BiPlay } from "react-icons/bi";
import { AiOutlinePlus } from "react-icons/ai";
import Footer from "./Footer";
import { ImTextColor } from "react-icons/im";

const apiKey = "14af83f372fe18ca097a8721d92b7145";
const url = "https://api.themoviedb.org/3";
const imgUrl = "https://image.tmdb.org/t/p/original";

const Card = ({ img, onClick }) => {
  return <img className="card" src={img} alt="cover" onClick={onClick} />;
};

const Row = ({ title, arr = [], onMovieClick }) => {
  return (
    <div className="row">
      <h2>{title}</h2>
      <div>
        {arr.map((item, index) => (
          <Card
            key={index}
            img={`${imgUrl}/${item.poster_path}`}
            onClick={() => onMovieClick(item)}
          />
        ))}
      </div>
    </div>
  );
};

const Movies = () => {
  const [upComing, setUpComing] = useState([]);
  const [nowPlaying, setNowPlaying] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    const fetchUpcoming = async () => {
      const {
        data: { results },
      } = await axios.get(`${url}/movie/upcoming?api_key=${apiKey}`);
      setUpComing(results);
    };
    const fetchNowPlaying = async () => {
      const {
        data: { results },
      } = await axios.get(`${url}/movie/now_playing?api_key=${apiKey}`);
      setNowPlaying(results);
    };
    const fetchPopular = async () => {
      const {
        data: { results },
      } = await axios.get(`${url}/movie/popular?api_key=${apiKey}`);
      setPopularMovies(results);
    };
    const fetchTopRated = async () => {
      const {
        data: { results },
      } = await axios.get(`${url}/movie/top_rated?api_key=${apiKey}`);
      setTopRated(results);
    };
    fetchUpcoming();
    fetchNowPlaying();
    fetchPopular();
    fetchTopRated();
  }, []);

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
  };

  const handleCloseDialog = () => {
    setSelectedMovie(null);
  };

  return (
    <section className="home">
      <div
        className="banner"
        style={{
          backgroundImage: popularMovies[0]
            ? `url(${`${imgUrl}/${popularMovies[0].poster_path}`})`
            : "rgb(16,16,16)",
        }}
      >
        <div>
          <button>
            <BiPlay /> Play{" "}
          </button>
          <button>
            My List <AiOutlinePlus />{" "}
          </button>
        </div>
      </div>
      <Row title={"Upcoming"} arr={upComing} onMovieClick={handleMovieClick} />
      <Row
        title={"Now Streaming"}
        arr={nowPlaying}
        onMovieClick={handleMovieClick}
      />
      <Row
        title={"Popular"}
        arr={popularMovies}
        onMovieClick={handleMovieClick}
      />
      <Row title={"Top Rated"} arr={topRated} onMovieClick={handleMovieClick} />

      {selectedMovie && (
        <MovieDialog movie={selectedMovie} onClose={handleCloseDialog} />
      )}
      <Footer />
    </section>
  );
};

export default Movies;
