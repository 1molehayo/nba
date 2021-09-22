import React, { useState } from "react";
import Slider from "react-slick";
import styles from "../../styles/app/components/hero.module.scss";
import { BlobImage } from "../global/blob-image";
import classnames from "classnames";
import { HERO_SLIDES } from "../../utility/constants";
import { useAppContext } from "../../contexts/appContext";

const Hero = () => {
  const [slideIndex, setSlideIndex] = useState(0);

  const { isTab } = useAppContext();

  const settings = {
    arrows: false,
    dots: false,
    fade: true,
    infinite: true,
    autoplay: true,
    speed: 800,
    autoplaySpeed: 2000,
    cssEase: "linear",
    slidesToShow: 1,
    slidesToScroll: 1,
    afterChange: () => setSlideIndex((prevState) => prevState++),
    beforeChange: (current, next) => setSlideIndex(next),
  };

  return (
    <section className={styles.wrapper}>
      <div className="container">
        <Slider {...settings} className={styles.hero__slider}>
          {HERO_SLIDES.map((item, i) => (
            <div key={i}>
              <div className={styles.container}>
                <div className={styles.content}>
                  <h2
                    dangerouslySetInnerHTML={{
                      __html: item.title,
                    }}
                    className={styles.title}
                  />

                  <p className="mb-5 font-italic pb-5">{item.desc}</p>

                  <button className="button button--primary font-italic">
                    Learn more <span className="icon-right-arrow ml-5" />
                  </button>

                  <div className={styles.slider__dots}>
                    {HERO_SLIDES.map((item, j) => (
                      <span
                        key={j}
                        className={classnames(styles.slider__dot, {
                          [styles.slider__dot__active]: j === slideIndex,
                        })}
                      />
                    ))}
                  </div>
                </div>

                {!isTab && (
                  <div className={styles.image}>
                    <BlobImage image={item.image} />
                  </div>
                )}
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default Hero;
