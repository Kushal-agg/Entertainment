import React, { useEffect, useState } from 'react'
import "./Home.scss"
import axios from "axios"
import { Link } from 'react-router-dom';
import { BiPlay } from "react-icons/bi"
import { AiOutlinePlus } from "react-icons/ai"

const apiKey = "14af83f372fe18ca097a8721d92b7145";
const url = "https://api.themoviedb.org/3";
const imgUrl = "https://image.tmdb.org/t/p/original";
const Card = ({img}) => {
  return (
    <img className='card' src={img} alt="cover" />
  );
}

const Row = ({title , arr=[]}) => {
  return(
    <div className='row'>
      <h2>{title}</h2>

      <div>
        {
          arr.map((item , index)=>{
            return <Card key={index} img={`${imgUrl}/${item.poster_path}`}/>
          })
        }
      </div>
    </div>
  )
}

const TVShows = () => {

  const [arrivingToday,setarrivingToday] = useState([]);
  const [onTheAir,setonTheAir] = useState([]);
  const [popular,setpopular] = useState([]);
  const [topRated,setTopRated] = useState([]);

  useEffect(()=>{
    const fetchArrivingToday = async()=>{
      const {data : {results}} = await axios.get(`${url}/tv/airing_today?api_key=${apiKey}`);
      setarrivingToday(results);
    };
    const fetchOnTheAir = async()=>{
      const {data : {results}} = await axios.get(`${url}/tv/on_the_air?api_key=${apiKey}`);
      setonTheAir(results);
    };
    const fetchPolpular = async()=>{
      const {data : {results}} = await axios.get(`${url}/tv/popular?api_key=${apiKey}`);
      setpopular(results);
    };
    const fetchTopRated = async()=>{
      const {data : {results}} = await axios.get(`${url}/tv/top_rated?api_key=${apiKey}`);
      setTopRated(results);
    };
    fetchArrivingToday();
    fetchOnTheAir();
    fetchPolpular();
    fetchTopRated();

  },[])

  return (
    <section className='home'>
      <div className='banner' style={{
        backgroundImage:popular[7]?`url(${`${imgUrl}/${popular[7].poster_path}`})`:"rgb(16,16,16)"
      }}>

        <div>
          <button><BiPlay /> Play  </button>
          <button>My List <AiOutlinePlus /> </button>
        </div>
      </div>
      <Row title = {"Arriving Today"} arr = {arrivingToday}/>
      <Row title = {"On The Air"} arr = {onTheAir}/>
      <Row title = {"Polpular"} arr = {popular}/>
      <Row title = {"Top Rated"} arr = {topRated}/>

    </section>
  )
}

export default TVShows