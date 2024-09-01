import React, { useEffect, useState } from "react";
import "./Home.scss";
import TvDialogBox from "./tvdialogbox";
import axios from "axios";
import { Link } from "react-router-dom";
import { BiPlay } from "react-icons/bi";
import { AiOutlinePlus } from "react-icons/ai";
import Footer from "./Footer";

const apiKey = "14af83f372fe18ca097a8721d92b7145";
const url = "https://api.themoviedb.org/3";
const imgUrl = "https://image.tmdb.org/t/p/original";
const Card = ({ img, onClick }) => {
  return <img className="card" src={img} alt="cover" onClick={onClick} />;
};

const Row = ({ title, arr = [], onTvClick }) => {
  return (
    <div className="row">
      <h2>{title}</h2>

      <div>
        {arr.map((item, index) => {
          return (
            <Card
              key={index}
              img={`${imgUrl}/${item.poster_path}`}
              onClick={() => onTvClick(item)}
            />
          );
        })}
      </div>
    </div>
  );
};

const TVShows = () => {
  const [arrivingToday, setarrivingToday] = useState([]);
  const [onTheAir, setonTheAir] = useState([]);
  const [popular, setpopular] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [selectedTv, setSelectedTv] = useState(null);

  useEffect(() => {
    const fetchArrivingToday = async () => {
      const {
        data: { results },
      } = await axios.get(`${url}/tv/airing_today?api_key=${apiKey}`);
      setarrivingToday(results);
    };
    const fetchOnTheAir = async () => {
      const {
        data: { results },
      } = await axios.get(`${url}/tv/on_the_air?api_key=${apiKey}`);
      setonTheAir(results);
    };
    const fetchPolpular = async () => {
      const {
        data: { results },
      } = await axios.get(`${url}/tv/popular?api_key=${apiKey}`);
      setpopular(results);
    };
    const fetchTopRated = async () => {
      const {
        data: { results },
      } = await axios.get(`${url}/tv/top_rated?api_key=${apiKey}`);
      setTopRated(results);
    };
    fetchArrivingToday();
    fetchOnTheAir();
    fetchPolpular();
    fetchTopRated();
  }, []);

  const handleTvClick = (tv) => {
    setSelectedTv(tv);
  };

  const handleCloseDialog = () => {
    setSelectedTv(null);
  };
  return (
    <section className="home">
      <div
        className="banner"
        style={{
          backgroundImage: popular[7]
            ? `url(${`${imgUrl}/${popular[7].poster_path}`})`
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
      <Row
        title={"Arriving Today"}
        arr={arrivingToday}
        onTvClick={handleTvClick}
      />
      <Row title={"On The Air"} arr={onTheAir} onTvClick={handleTvClick} />
      <Row title={"Polpular"} arr={popular} onTvClick={handleTvClick} />
      <Row title={"Top Rated"} arr={topRated} onTvClick={handleTvClick} />

      {selectedTv && (
        <TvDialogBox tv={selectedTv} onClose={handleCloseDialog} />
      )}

      <Footer />
    </section>
  );
};

export default TVShows;
