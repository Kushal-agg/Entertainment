import React, { useEffect, useState } from "react";
import axios from "axios";
import { CiSearch } from "react-icons/ci";
import MovieDialog from "./moviesdialogbox";
import TvDialogBox from "./tvdialogbox";
import "./searchRes.scss";

const apiKey = "14af83f372fe18ca097a8721d92b7145";
const url = "https://api.themoviedb.org/3";
const imgUrl = "https://image.tmdb.org/t/p/original";

const Cards = ({ item, onClick }) => {
  const imgPath = item.poster_path || item.profile_path;
  const imgSrc = imgPath ? `${imgUrl}${imgPath}` : null;
  return (
    <div className="cards" onClick={() => onClick(item)}>
      {imgSrc && (
        <img src={imgSrc} alt={item.title || item.name} className="cards-img" />
      )}
      <div className="cards-info">
        <h3 className="cards-title">{item.title || item.name}</h3>
        {item.release_date && (
          <p className="cards-release">{item.release_date}</p>
        )}
        {item.first_air_date && (
          <p className="cards-release">{item.first_air_date}</p>
        )}
        {item.overview && <p className="cards-overview">{item.overview}</p>}
      </div>
    </div>
  );
};

const Column = ({ arr = [], onCardClick }) => {
  return (
    <div className="column">
      <div className="column-content">
        {arr.map((item, index) => {
          return (
            <Cards key={index} item={item} onClick={() => onCardClick(item)} />
          );
        })}
      </div>
    </div>
  );
};

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedTvShow, setSelectedTvShow] = useState(null);

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCardClick = (item) => {
    console.log("Clicked item:", item); // Debugging line
    if (item.media_type === "movie") {
      setSelectedMovie(item);
    } else if (item.media_type === "tv") {
      setSelectedTvShow(item);
    } else {
      console.warn("Unknown media type:", item.media_type);
    }
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
        const filteredResults = results.filter(
          (item) => item.media_type !== "person"
        );
        setSearchResults(filteredResults);
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
          placeholder="Search movies or shows..."
          value={searchTerm}
          onChange={handleInputChange}
        />
        <button className="search-icon">
          <CiSearch />
        </button>
      </div>
      {searchResults.length > 0 && (
        <div className="results-container">
          <Column arr={searchResults} onCardClick={handleCardClick} />
        </div>
      )}
      {selectedTvShow && (
        <TvDialogBox
          tv={selectedTvShow}
          onClose={() => setSelectedTvShow(null)}
        />
      )}
      {selectedMovie && (
        <MovieDialog
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}
    </div>
  );
};

export default Search;
