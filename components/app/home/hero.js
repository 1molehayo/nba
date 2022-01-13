import React, { useRef, useState } from 'react';
import Image from 'next/image';
import PropTypes from 'prop-types';
import Link from 'next/link';
import Slider from 'react-slick';
import classnames from 'classnames';
import styles from '../../../styles/app/components/hero.module.scss';
import { BlobImage } from '../../global/blob-image';
import { useAppContext } from '../../../contexts/app-context';
import {
  capitalizeFirstLetter,
  formatCharLength,
  getImagePath,
  shimmer,
  toBase64
} from '../../../utility';

export default function Hero({ data }) {
  const [slideIndex, setSlideIndex] = useState(0);
  const { isTab, isMobile } = useAppContext();
  const sliderRef = useRef(null);

  const settings = {
    arrows: false,
    dots: false,
    fade: true,
    infinite: true,
    autoplay: true,
    speed: 500,
    autoplaySpeed: 10000,
    cssEase: 'linear',
    slidesToShow: 1,
    slidesToScroll: 1,
    afterChange: () => setSlideIndex((prevState) => prevState + 1),
    beforeChange: (current, next) => setSlideIndex(next)
  };

  const goToSlide = (index) => {
    sliderRef.current.slickGoTo(index);
  };

  const slides = data.slice(0, 3);

  return (
    <section className={styles.wrapper}>
      <Slider {...settings} ref={sliderRef} className={styles.hero__slider}>
        {slides.map((item, i) => (
          <div key={i}>
            {isMobile && (
              <div className={styles.image__bg}>
                <div className={styles.image__overlay} />

                {item.image && (
                  <Image
                    src={getImagePath(item.image.formats.thumbnail.url)}
                    placeholder="blur"
                    blurDataURL={`data:image/svg+xml;base64,${toBase64(
                      shimmer(700, 500)
                    )}`}
                    alt={item.title}
                    layout="fill"
                    objectFit="cover"
                  />
                )}
              </div>
            )}

            <div className="container">
              <div className={styles.container}>
                <div className={styles.content}>
                  <h2
                    dangerouslySetInnerHTML={{
                      __html: item.title
                    }}
                    className={styles.title}
                  />

                  <p className="mb-5 font-italic pb-5">
                    {capitalizeFirstLetter(
                      formatCharLength(item.short_description, 70)
                    )}
                  </p>

                  <Link href={`/news/${item.slug}`} passHref>
                    <button className="button button--primary font-italic">
                      Learn more <span className="icon-right-arrow ml-5" />
                    </button>
                  </Link>

                  {slides.length > 1 && (
                    <div className={styles.slider__dots}>
                      {data.map((dot, j) => (
                        <span
                          key={j}
                          className={classnames(styles.slider__dot, {
                            [styles.slider__dot__active]: j === slideIndex
                          })}
                          onClick={() => goToSlide(j)}
                        />
                      ))}
                    </div>
                  )}
                </div>

                {!isTab && (
                  <div className={styles.image}>
                    {item.image && (
                      <BlobImage image={getImagePath(item.image.url)} />
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
}

Hero.propTypes = {
  data: PropTypes.array
};
