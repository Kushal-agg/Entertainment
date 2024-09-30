import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./Modal.scss";
import { getLangNameFromCode } from "language-name-map";

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
        console.error("Failed to fetch TV trailer:", error);
      }
    };

    const fetchCast = async () => {
      if (!tv) return;

      try {
        const { data } = await axios.get(
          `https://api.themoviedb.org/3/tv/${tv.id}/credits?api_key=${apiKey}`
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
      if (!tv) return;
      try {
        const { data } = await axios.get(
          `https://api.themoviedb.org/3/tv/${tv.id}/reviews?api_key=${apiKey}`
        );
        setReviews(data.results);
      } catch (error) {
        console.error("Failed to fetch reviews:", error);
      }
    };
    fetchReviews();
  }, [page]);

  if (!tv) return null;

  const tvGenres = tv.genre_ids
    ? tv.genre_ids
        .map((id) => genreList.find((genre) => genre.id === id)?.name)
        .filter(Boolean)
    : [];

  const languageName = getLangNameFromCode(tv.original_language).name;

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
      .replace(/(\d+(\.\d+)?\/\d+)/g, "<br /><em>$1</em>"); // Handle ratings like "7.5/10" to be on new line

    return formattedContent;
  };
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
          <div className="main-content">
            <div className="poster-container">
              <img
                className="dialog-poster"
                src={`${imgUrl}/${tv.poster_path}`}
                alt={tv.name}
              />
              <div className="movie-info">
                <p>
                  <strong>On Air:</strong>{" "}
                  {new Date(tv.first_air_date).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
                <p>
                  <strong>Rating:</strong> {tv.vote_average.toFixed(1)} / 10
                </p>
                <p>
                  <strong>Language:</strong> {languageName}
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
                    title="TV Trailer"
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

export default TvDialogBox;
