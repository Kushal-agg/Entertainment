import React, { useEffect, useState } from "react";
import axios from "axios";
import { CiSearch } from "react-icons/ci";
import "./searchRes.scss"; // Ensure this file contains the necessary styles

const apiKey = "14af83f372fe18ca097a8721d92b7145";
const url = "https://api.themoviedb.org/3";
const imgUrl = "https://image.tmdb.org/t/p/original";

const Cards = ({ img, title, overview, mediaType, releaseDate }) => {
  return (
    <div className="cards">
      <img src={img} alt={title} className="cards-img" />
      <div className="cards-info">
        <h3 className="cards-title">{title}</h3>
        {overview && <p className="cards-overview">{overview}</p>}
        <p className="cards-type">Type: {mediaType}</p>
        {releaseDate && (
          <p className="cards-release">Release Date: {releaseDate}</p>
        )}
      </div>
    </div>
  );
};

const Column = ({ title, arr = [] }) => {
  return (
    <div className="column">
      <h2 className="column-title">{title}</h2>
      <div className="column-content">
        {arr.map((item, index) => {
          const imgPath = item.poster_path || item.profile_path;
          const imgSrc = imgPath ? `${imgUrl}${imgPath}` : null;
          return imgSrc ? (
            <Cards
              key={index}
              img={imgSrc}
              title={item.title || item.name}
              overview={item.overview}
              mediaType={item.media_type}
              releaseDate={item.release_date || item.first_air_date}
            />
          ) : null;
        })}
      </div>
    </div>
  );
};

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (searchTerm.trim() === "") {
        setSearchResults([]);
        return;
      }
      try {
        const {
          data: { results },
        } = await axios.get(`${url}/search/multi`, {
          params: {
            api_key: apiKey,
            query: searchTerm,
          },
        });
        setSearchResults(results);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    };
    fetchSearchResults();
  }, [searchTerm]);

  return (
    <div className="search-container">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search movies, shows, or people..."
          value={searchTerm}
          onChange={handleInputChange}
        />
        <button className="search-icon">
          <CiSearch />
        </button>
      </div>
      {searchResults.length > 0 && (
        <div className="results-container">
          <Column arr={searchResults} />
        </div>
      )}
    </div>
  );
};

export default Search;
