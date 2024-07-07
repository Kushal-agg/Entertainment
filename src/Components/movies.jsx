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

const Movies = () => {

  const [upComing,setUpComing] = useState([]);
  const [nowPlaying,setnowaplaying] = useState([]);
  const [popularMovies,setpopularMovies] = useState([]);
  const [topRated,setTopRated] = useState([]);

  useEffect(()=>{
    const fetchUpcoming = async()=>{
      const {data : {results}} = await axios.get(`${url}/movie/upcoming?api_key=${apiKey}`);
      setUpComing(results);
    };
    const fetchNowPlaying = async()=>{
      const {data : {results}} = await axios.get(`${url}/movie/now_playing?api_key=${apiKey}`);
      setnowaplaying(results);
    };
    const fetchPolpular = async()=>{
      const {data : {results}} = await axios.get(`${url}/movie/popular?api_key=${apiKey}`);
      setpopularMovies(results);
    };
    const fetchTopRated = async()=>{
      const {data : {results}} = await axios.get(`${url}/movie/top_rated?api_key=${apiKey}`);
      setTopRated(results);
    };
    fetchUpcoming();
    fetchNowPlaying();
    fetchPolpular();
    fetchTopRated();

  },[])

  return (
    <section className='home'>
      <div className='banner' style={{
        backgroundImage:popularMovies[0]?`url(${`${imgUrl}/${popularMovies[0].poster_path}`})`:"rgb(16,16,16)"
      }}>

        <div>
          <button><BiPlay /> Play  </button>
          <button>My List <AiOutlinePlus /> </button>
        </div>
      </div>
      <Row title = {"Upcoming"} arr = {upComing}/>
      <Row title = {"Now Streaming"} arr = {nowPlaying}/>
      <Row title = {"Polpular"} arr = {popularMovies}/>
      <Row title = {"Top Rated"} arr = {topRated}/>

    </section>
  )
}

export default Movies