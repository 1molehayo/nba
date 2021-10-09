import React from 'react';
import Image from 'next/image';
import styles from '../../../styles/app/pages/home.module.scss';
import ChairmanImage from '../../../assets/images/home/chairman.png';
import { useAppContext } from '../../../contexts/appContext';

export default function Quote() {
  const { isLargeTab } = useAppContext();

  return (
    <section className="section section--lg">
      <div className="container">
        <div className={styles.quote}>
          {!isLargeTab && <div className={styles.quote__icon}>“</div>}

          <div className={styles.quote__content}>
            {!isLargeTab && (
              <p>
                <span className="color-primary">
                  BARTHOLOMEW AGUEGBODO, ESQ
                </span>{' '}
                Chairman
              </p>
            )}

            {isLargeTab && <div className={styles.quote__icon}>“</div>}

            <p>
              Bartholomew Aguegbodo is the Chairman, Nigerian Bar Association,
              Ikeja Branch. He holds LL.B degree from the University of Lagos
              and has been called to the Nigerian Bar over two decades ago.{' '}
            </p>
          </div>

          <div className={styles.quote__image__wrapper}>
            <div className={styles.quote__image}>
              <Image
                src={ChairmanImage.src}
                alt="chairman"
                width={220}
                height={220}
                objectFit="cover"
              />
            </div>

            {isLargeTab && (
              <p>
                <span className="color-primary">
                  BARTHOLOMEW AGUEGBODO, ESQ
                </span>
                <br />
                Chairman
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
