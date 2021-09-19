import React from "react";
import Slider from "react-slick";
import styles from "../../styles/app/components/hero.module.scss";

const Hero = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Slider {...settings} className={styles.hero__slider}>
      <div className="container hero__container">
        <div className="hero__content">
          <h2 className="color-primary">
            FAWEHIMI II <br /> SM 2021
          </h2>
        </div>
        <div className="hero__image"></div>
      </div>
    </Slider>
  );
};

export default Hero;
