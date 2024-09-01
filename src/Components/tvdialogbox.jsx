import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Home.scss";
const imgUrl = "https://image.tmdb.org/t/p/original";
const apiKey = "14af83f372fe18ca097a8721d92b7145";

const genreList = [
  { id: 10759, name: "Action & Adventure" },
  { id: 16, name: "Animation" },
  { id: 35, name: "Comedy" },
  { id: 80, name: "Crime" },
  { id: 99, name: "Documentary" },
  { id: 18, name: "Drama" },
  { id: 10751, name: "Family" },
  { id: 10762, name: "Kids" },
  { id: 9648, name: "Mystery" },
  { id: 10763, name: "News" },
  { id: 10764, name: "Reality" },
  { id: 10765, name: "Sci-Fi & Fantasy" },
  { id: 10766, name: "Soap" },
  { id: 10767, name: "Talk" },
  { id: 10768, name: "War & Politics" },
  { id: 37, name: "Western" },
];

const TvDialogBox = ({ tv, onClose }) => {
  const [trailer, setTrailer] = useState(null);
  useEffect(() => {
    const fetchTrailer = async () => {
      if (!tv) return;

      try {
        const { data } = await axios.get(
          `https://api.themoviedb.org/3/tv/${tv.id}/videos?api_key=${apiKey}`
        );

        // Find a YouTube trailer
        const youtubeTrailer = data.results.find(
          (video) => video.site === "YouTube" && video.type === "Trailer"
        );

        if (youtubeTrailer) {
          setTrailer(`https://www.youtube.com/embed/${youtubeTrailer.key}`);
        }
      } catch (error) {
        console.error("Failed to fetch tv trailer:", error);
      }
    };

    fetchTrailer();
  }, [tv]);
  if (!tv) return null;

  const tvGenres = tv.genre_ids
    ? tv.genre_ids
        .map((id) => genreList.find((genre) => genre.id === id)?.name)
        .filter(Boolean)
    : [];

  return (
    <div className="dialog-backdrop" onClick={onClose}>
      <div className="dialog-content">
        <div
          className="dialog-background"
          style={{
            backgroundImage: `url(${imgUrl}/${
              tv.backdrop_path || tv.poster_path
            })`,
          }}
        ></div>
        <div className="dialog-inner" onClick={(e) => e.stopPropagation()}>
          <button className="close-button" onClick={onClose}>
            &times;
          </button>
          <div className="poster-container">
            <img
              className="dialog-poster"
              src={`${imgUrl}/${tv.poster_path}`}
              alt={tv.title}
            />
            <div className="movie-info">
              <p>
                <strong>First Air Date:</strong> {tv.first_air_date}
              </p>
              <p>
                <strong>Rating:</strong> {tv.vote_average.toFixed(1)} / 10
              </p>
              <p>
                <strong>Country:</strong> {tv.origin_country[0]}
              </p>
            </div>
          </div>
          <div className="content-container">
            <h2>{tv.name}</h2>
            <div className="genre-list">
              {tvGenres.map((genre, index) => (
                <span key={index} className="genre-tag">
                  {genre}
                </span>
              ))}
            </div>
            <p>{tv.overview}</p>
            {trailer && (
              <div className="trailer-container">
                <iframe
                  width="100%"
                  height="315"
                  src={trailer}
                  title="Movie Trailer"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TvDialogBox;
