import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { getLangNameFromCode } from "language-name-map";
import "./Modal.scss";

const imgUrl = "https://image.tmdb.org/t/p/original";
const apiKey = "14af83f372fe18ca097a8721d92b7145";

const genreList = [
  { id: 28, name: "Action" },
  { id: 12, name: "Adventure" },
  { id: 16, name: "Animation" },
  { id: 35, name: "Comedy" },
  { id: 80, name: "Crime" },
  { id: 99, name: "Documentary" },
  { id: 18, name: "Drama" },
  { id: 10751, name: "Family" },
  { id: 14, name: "Fantasy" },
  { id: 36, name: "History" },
  { id: 27, name: "Horror" },
  { id: 10402, name: "Music" },
  { id: 9648, name: "Mystery" },
  { id: 10749, name: "Romantic" },
  { id: 878, name: "Science Fiction" },
  { id: 10770, name: "TV-Film" },
  { id: 53, name: "Thriller" },
  { id: 10752, name: "War" },
  { id: 37, name: "Western" },
];

const MovieDialog = ({ movie, onClose }) => {
  const [trailer, setTrailer] = useState(null);
  const [cast, setCast] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [page, setPage] = useState(1);

  const reviewRef = useRef(null);

  const handleScroll = () => {
    if (reviewRef.current) {
      const { scrollLeft, clientWidth, scrollWidth } = reviewRef.current;
      if (scrollLeft + clientWidth >= scrollWidth - 10) {
        setPage((prev) => prev + 1);
      }
    }
  };

  useEffect(() => {
    const curr = reviewRef.current;
    if (curr) {
      curr.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (curr) {
        curr.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);
  useEffect(() => {
    const fetchTrailer = async () => {
      if (!movie) return;

      try {
        const { data } = await axios.get(
          `https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=${apiKey}`
        );

        const youtubeTrailer = data.results.find(
          (video) => video.site === "YouTube" && video.type === "Trailer"
        );

        if (youtubeTrailer) {
          setTrailer(`https://www.youtube.com/embed/${youtubeTrailer.key}`);
        }
      } catch (error) {
        console.error("Failed to fetch movie trailer:", error);
      }
    };

    const fetchCast = async () => {
      if (!movie) return;

      try {
        const { data } = await axios.get(
          `https://api.themoviedb.org/3/movie/${movie.id}/credits?api_key=${apiKey}`
        );
        // Filter cast members who belong to the acting department and have a profile path
        const filteredCast = data.cast.filter(
          (member) =>
            member.known_for_department === "Acting" && member.profile_path
        );
        setCast(filteredCast);
      } catch (error) {
        console.error("Failed to fetch cast information:", error);
      }
    };

    fetchTrailer();
    fetchCast();
  }, []);

  useEffect(() => {
    const fetchReviews = async () => {
      if (!movie) return;
      try {
        console.log("Fetching reviews for page:", page);
        const { data } = await axios.get(
          `https://api.themoviedb.org/3/movie/${movie.id}/reviews?api_key=${apiKey}&page=${page}`
        );
        setReviews((prev) =>
          [...prev, ...data.results].filter(
            (item, index, self) =>
              index === self.findIndex((m) => m.id === item.id)
          )
        );
      } catch (error) {
        console.error("Failed to fetch reviews:", error);
      }
    };
    fetchReviews();
  }, [page]);

  if (!movie) return null;

  const movieGenres = movie.genre_ids
    ? movie.genre_ids
        .map((id) => genreList.find((genre) => genre.id === id)?.name)
        .filter(Boolean)
    : [];

  const languageName = getLangNameFromCode(movie.original_language).name;
  const parseContent = (content) => {
    // Replace <a> tags with clickable links
    const modifiedContent = content.replace(
      /<a href="([^"]+)">([^<]+)<\/a>/g,
      '<a href="$1" target="_blank" rel="noopener noreferrer">$2</a>'
    );

    // Process blockquotes for ">"
    const blockquoteContent = modifiedContent.replace(
      /^>\s*(.*)/gm,
      "<blockquote>$1</blockquote>"
    );

    // Format bold, italic sentences, handle Score/Verdict and ensure proper line breaks
    const formattedContent = blockquoteContent
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") // Convert **text** to <strong> (bold)
      .replace(/\*(.*?)\*/g, "<em>$1</em>") // Convert *text* to <em> (italic)
      .replace(/_(.*?)_/g, "<em>$1</em>") // Convert _text_ to <em> (italic)
      .replace(/\s*\|\s*/g, "<br />") // Convert pipe | to line break
      .replace(/(Score:)/g, "<br /><strong>$1</strong>") // Ensure line break before "Score:"
      .replace(/(Verdict:)/g, "<br /><strong>$1</strong>") // Ensure line break before "Verdict:"
      .replace(/(Final rating:)/g, "<br /><strong>$1</strong>") // Ensure line break before "Rating:"
      .replace(/(Rating:)/g, "<br /><strong>$1</strong>") // Ensure line break before "Rating:"
      .replace(/(GRADE:)/g, "<br /><strong>$1</strong>") // Ensure line break before "Grade:"
      .replace(/(?<=:\s*)(\d+(\.\d+)?\/\d+)/g, "<em>$1</em><br />");

    return formattedContent;
  };

  return (
    <div className="dialog-backdrop" onClick={onClose}>
      <div className="dialog-content">
        <div className="dialog-inner" onClick={(e) => e.stopPropagation()}>
          <button className="close-button" onClick={onClose}>
            &times;
          </button>
          <div className="main-content">
            <div className="poster-container">
              <img
                className="dialog-poster"
                src={`${imgUrl}/${movie.poster_path}`}
                alt={movie.title}
              />
              <div className="movie-info">
                <p>
                  <strong>Release Date:</strong>
                  {new Date(movie.release_date).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
                <p>
                  <strong>Rating:</strong> {movie.vote_average.toFixed(1)} / 10
                </p>
                <p>
                  <strong>Language:</strong> {languageName}
                </p>
              </div>
            </div>

            <div className="content-container">
              <h2>{movie.title}</h2>
              <div className="genre-list">
                {movieGenres.map((genre, index) => (
                  <span key={index} className="genre-tag">
                    {genre}
                  </span>
                ))}
              </div>
              <p>{movie.overview}</p>
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
          {cast.length > 0 && (
            <div className="cast-section">
              <h3>Top Cast</h3>
              <div className="cast-list">
                {cast.map((member) => (
                  <div className="cast-member" key={member.id}>
                    <img
                      src={`${imgUrl}/${member.profile_path}`}
                      alt={member.name}
                    />
                    <p>{member.name}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          {reviews.length > 0 && (
            <div className="review-section">
              <h3>Reviews</h3>
              <div className="review-list" ref={reviewRef}>
                {reviews.map((item) => (
                  <div className="review-item" key={item.id}>
                    <p
                      dangerouslySetInnerHTML={{
                        __html: parseContent(item.content),
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieDialog;
