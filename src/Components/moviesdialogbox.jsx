import React, { useState, useEffect } from "react";
import axios from "axios";

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

const languageMap = {
  en: "English",
  es: "Spanish",
  fr: "French",
  de: "German",
  it: "Italian",
  ja: "Japanese",
  ko: "Korean",
  zh: "Chinese",
  ru: "Russian",
  ar: "Arabic",
  hi: "Hindi",
  nl: "Dutch",
  sv: "Swedish",
  tr: "Turkish",
  th: "Thai",
  pl: "Polish",
  id: "Indonesian",
  da: "Danish",
  no: "Norwegian",
  fi: "Finnish",
  cs: "Czech",
  el: "Greek",
  he: "Hebrew",
  hu: "Hungarian",
  ro: "Romanian",
  vi: "Vietnamese",
  sr: "Serbian",
  uk: "Ukrainian",
  bg: "Bulgarian",
  fa: "Persian",
  sk: "Slovak",
  sl: "Slovenian",
  hr: "Croatian",
  lt: "Lithuanian",
  lv: "Latvian",
  et: "Estonian",
  is: "Icelandic",
  ga: "Irish",
  ms: "Malay",
  sw: "Swahili",
  tl: "Tagalog",
  tlh: "Klingon",
  xh: "Xhosa",
  zu: "Zulu",
  cy: "Welsh",
  sq: "Albanian",
  mk: "Macedonian",
  af: "Afrikaans",
  hy: "Armenian",
  az: "Azerbaijani",
  eu: "Basque",
  bn: "Bengali",
  bs: "Bosnian",
  ceb: "Cebuano",
  ny: "Chichewa",
  co: "Corsican",
  eo: "Esperanto",
  fy: "Frisian",
  gl: "Galician",
  gd: "Scots Gaelic",
  gu: "Gujarati",
  ht: "Haitian Creole",
  ha: "Hausa",
  haw: "Hawaiian",
  iw: "Hebrew",
  ig: "Igbo",
  jw: "Javanese",
  kn: "Kannada",
  kk: "Kazakh",
  km: "Khmer",
  rw: "Kinyarwanda",
  ky: "Kyrgyz",
  lo: "Lao",
  la: "Latin",
  lb: "Luxembourgish",
  mk: "Macedonian",
  mg: "Malagasy",
  ml: "Malayalam",
  mt: "Maltese",
  mi: "Maori",
  mr: "Marathi",
  mn: "Mongolian",
  my: "Myanmar (Burmese)",
  ne: "Nepali",
  ps: "Pashto",
  pa: "Punjabi",
  sm: "Samoan",
  gd: "Scots Gaelic",
  st: "Sesotho",
  sn: "Shona",
  sd: "Sindhi",
  si: "Sinhala",
  so: "Somali",
  su: "Sundanese",
  tg: "Tajik",
  ta: "Tamil",
  te: "Telugu",
  ur: "Urdu",
  uz: "Uzbek",
  cy: "Welsh",
  fy: "Western Frisian",
  yi: "Yiddish",
  yo: "Yoruba",
};

const MovieDialog = ({ movie, onClose }) => {
  const [trailer, setTrailer] = useState(null);

  useEffect(() => {
    const fetchTrailer = async () => {
      if (!movie) return;

      try {
        const { data } = await axios.get(
          `https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=${apiKey}`
        );

        // Find a YouTube trailer
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

    fetchTrailer();
  }, [movie]);

  if (!movie) return null;

  const movieGenres = movie.genre_ids
    ? movie.genre_ids
        .map((id) => genreList.find((genre) => genre.id === id)?.name)
        .filter(Boolean)
    : [];

  const languageName =
    languageMap[movie.original_language] || movie.original_language;

  return (
    <div className="dialog-backdrop" onClick={onClose}>
      <div className="dialog-content">
        <div
          className="dialog-background"
          style={{
            backgroundImage: `url(${imgUrl}/${
              movie.backdrop_path || movie.poster_path
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
              src={`${imgUrl}/${movie.poster_path}`}
              alt={movie.title}
            />
            <div className="movie-info">
              <p>
                <strong>Release Date:</strong> {movie.release_date}
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
      </div>
    </div>
  );
};

export default MovieDialog;
