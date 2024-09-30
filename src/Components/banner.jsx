import React from "react";
import Slider from "react-slick";
import { useRef } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { SlArrowLeft } from "react-icons/sl";
import { SlArrowRight } from "react-icons/sl";
import "./bannerStyles.scss";

const imgUrl = "https://image.tmdb.org/t/p/original";

const Banner = ({ items }) => {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false,
    centerMode: true,
    centerPadding: "200px",
    pauseOnHover: false,
  };

  const ref = useRef(null);
  return (
    <section className="slider">
      <SlArrowLeft
        className="left-arrow"
        onClick={() => ref?.current?.slickPrev()}
      />

      <SlArrowRight
        className="right-arrow"
        onClick={() => ref?.current?.slickNext()}
      />

      <Slider {...settings} ref={ref} className="slider">
        {items.map((item, index) => (
          <div key={index} className="slide-item">
            <img src={`${imgUrl}${item.poster_path}`} alt="cover" />
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default Banner;
