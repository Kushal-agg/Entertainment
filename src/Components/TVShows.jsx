import React, { useEffect, useRef, useState } from "react";
import "./Home.scss";
import TvDialogBox from "./tvModal";
import axios from "axios";
import { Link } from "react-router-dom";
import { BiPlay, BiWindows } from "react-icons/bi";
import { AiOutlinePlus } from "react-icons/ai";
import Footer from "./Footer";
import Row from "./Row";
import Banner from "./banner";

const apiKey = "14af83f372fe18ca097a8721d92b7145";
const url = "https://api.themoviedb.org/3";
const imgUrl = "https://image.tmdb.org/t/p/original";

const TVShows = () => {
  const [arrivingToday, setArrivingToday] = useState([]);
  const [arrivingTodayPage, setArrivingTodayPage] = useState(1);

  const [onTheAir, setOnTheAir] = useState([]);
  const [onTheAirPage, setOnTheAirPage] = useState(1);

  const [popular, setPopular] = useState([]);
  const [popularPage, setPopularPage] = useState(1);

  const [topRated, setTopRated] = useState([]);
  const [topRatedPage, setTopRatedPage] = useState(1);

  const [selectedTv, setSelectedTv] = useState(null);

  useEffect(() => {
    const fetchArrivingToday = async () => {
      const response = await axios.get(
        `${url}/tv/airing_today?api_key=${apiKey}&include_adult=false&page=${arrivingTodayPage}`
      );
      const filteredResults = response.data.results.filter(
        (item) => item.poster_path !== null
      );
      setArrivingToday((prev) =>
        [...prev, ...filteredResults].filter(
          (item, index, self) =>
            index === self.findIndex((m) => m.id === item.id)
        )
      );
    };
    fetchArrivingToday();
  }, [arrivingTodayPage]);

  useEffect(() => {
    const fetchOnTheAir = async () => {
      const response = await axios.get(
        `${url}/tv/on_the_air?api_key=${apiKey}&include_adult=false&page=${onTheAirPage}`
      );
      const filteredResults = response.data.results.filter(
        (item) => item.poster_path !== null
      );
      setOnTheAir((prev) =>
        [...prev, ...filteredResults].filter(
          (item, index, self) =>
            index === self.findIndex((m) => m.id === item.id)
        )
      );
    };
    fetchOnTheAir();
  }, [onTheAirPage]);

  useEffect(() => {
    const fetchPolpular = async () => {
      const response = await axios.get(
        `${url}/tv/popular?api_key=${apiKey}&include_adult=false&page=${popularPage}`
      );
      const filteredResults = response.data.results.filter(
        (item) => item.poster_path !== null
      );
      setPopular((prev) =>
        [...prev, ...filteredResults].filter(
          (item, index, self) =>
            index === self.findIndex((m) => m.id === item.id)
        )
      );
    };
    fetchPolpular();
  }, [popularPage]);

  useEffect(() => {
    const fetchTopRated = async () => {
      const response = await axios.get(
        `${url}/tv/top_rated?api_key=${apiKey}&include_adult=false&page=${topRatedPage}`
      );
      const filteredResults = response.data.results.filter(
        (item) => item.poster_path !== null
      );
      setTopRated((prev) =>
        [...prev, ...filteredResults].filter(
          (item, index, self) =>
            index === self.findIndex((m) => m.id === item.id)
        )
      );
    };
    fetchTopRated();
  }, [topRatedPage]);

  const handleClick = (tv) => {
    setSelectedTv(tv);
  };

  const handleCloseDialog = () => {
    setSelectedTv(null);
  };

  const utv = [...arrivingToday, ...onTheAir, ...popular, ...topRated]
    .filter((item) => item.poster_path !== null)
    .filter(
      (item, index, self) => index === self.findIndex((m) => m.id === item.id)
    );
  return (
    <section>
      <Banner items={utv} />
      <Row
        title={"Arriving Today"}
        arr={arrivingToday}
        onClick={handleClick}
        onScrollEnd={() => setArrivingTodayPage((page) => page + 1)}
      />
      <Row
        title={"On The Air"}
        arr={onTheAir}
        onClick={handleClick}
        onScrollEnd={() => setOnTheAirPage((page) => page + 1)}
      />
      <Row
        title={"Polpular"}
        arr={popular}
        onClick={handleClick}
        onScrollEnd={() => setPopularPage((page) => page + 1)}
      />
      <Row
        title={"Top Rated"}
        arr={topRated}
        onClick={handleClick}
        onScrollEnd={() => setTopRatedPage((page) => page + 1)}
      />

      {selectedTv && (
        <TvDialogBox tv={selectedTv} onClose={handleCloseDialog} />
      )}

      <Footer />
    </section>
  );
};

export default TVShows;
