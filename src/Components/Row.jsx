import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./Row.scss";

const imgUrl = "https://image.tmdb.org/t/p/original";

const Row = ({ title, arr, nav, onScrollEnd }) => {
  const rowRef = useRef(null);

  const handleScroll = () => {
    if (rowRef.current) {
      const { scrollLeft, clientWidth, scrollWidth } = rowRef.current;
      if (scrollLeft + clientWidth >= scrollWidth) {
        onScrollEnd();
      }
    }
  };

  useEffect(() => {
    const curr = rowRef.current;
    if (curr) {
      curr.addEventListener("scroll", handleScroll);
      console.log("added event listener");
    }
    return () => {
      if (curr) {
        curr.removeEventListener("scroll", handleScroll);
        console.log("removed event listener");
      }
    };
  }, []);

  return (
    <div className="row">
      <h2>{title}</h2>

      <div className="row-content" ref={rowRef}>
        {arr.map((item, index) => {
          return (
            <Link
              to={`${nav}/${item.id}`}
              className="card-container"
              key={index}
            >
              <img
                className="card"
                src={`${imgUrl}/${item.poster_path}`}
                alt="cover"
              />
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Row;
