import React, { useEffect, useState } from 'react'
import "./Home.scss"
import axios from "axios"
import { CiSearch } from "react-icons/ci"


const apiKey = "14af83f372fe18ca097a8721d92b7145";
const url = "https://api.themoviedb.org/3";
const imgUrl = "https://image.tmdb.org/t/p/original";

const Card = ({img}) => {
    return (
      <img className='card' src={img} alt="" />
    );
}
  
const Column = ({title , arr=[]}) => {
    return(
      <div className='column'>
          {
            arr.map((item , index)=>{
                if (item.hasOwnProperty("poster_path")) {
                    if(item.poster_path != null){
                        return <Card key={index} img= {`${imgUrl}/${item.poster_path}`}/>
                    }
                }
                else if(item.hasOwnProperty("profile_path")){
                    if(item.profile_path != null){
                        return <Card key={index} img= {`${imgUrl}/${item.profile_path}`}/>
                    }
                }
            })
          }
      </div>
    )
}

const Search = () => {
    const [searchTerm, setSearchTerm] = React.useState("");
    const [searchResults, setSearchResults] = React.useState([]);
    const handleSubmit = e => {
        setSearchTerm(e.target.value);
    };
    React.useEffect(() => {
        const fetchSearchResults = async()=>{
            const {data : {results}} = await axios.get(`${url}/search/multi?api_key=${apiKey}&query=${searchTerm}`);
            setSearchResults(results);
        };
        fetchSearchResults();
    }, [searchTerm]);
    return (
        <>
            <div class="searchbanner">
            <div class="wrap">
                <div class="search">
                    <input type="text" class="searchTerm" placeholder="Search"
                        value={searchTerm}
                        onChange={handleSubmit}></input>
                    <button type="submit" class="searchButton">
                        <i><CiSearch /></i>
                    </button>
                </div>
                <Column title = {"Results"} arr = {searchResults}/>
            </div>
            </div>
        </>
    );
}

export default Search;