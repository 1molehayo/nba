import React, { useState } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import Image from 'next/image';
import styles from '../../styles/app/components/about-card.module.scss';
import { Modal } from '../global';
import { PROFILES } from '../../utility/profiles';
import { isArrayEmpty, shimmer, toBase64 } from '../../utility';

export const AboutCard = ({ item }) => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState();
  const toggleModal = () => setOpenModal((prevState) => !prevState);

  const getProfile = () => {
    const result = PROFILES.filter((profile) => profile.peopleId === item.id);

    if (isArrayEmpty(result)) {
      return null;
    }

    setSelectedProfile(result[0]);
    return toggleModal();
  };

  const formatText = (str) => {
    if (str) {
      const arr = str.split('<br/>');
      return arr.map((elem, j) => <p key={j}>{elem}</p>);
    }

    return '';
  };

  const hasProfile = () => {
    return PROFILES.some((profile) => profile.peopleId === item.id);
  };

  return (
    <>
      <div
        role="button"
        className={classnames(styles.wrapper, {
          'card--no-link': !hasProfile()
        })}
        onClick={() => getProfile()}
      >
        <div className={styles.image}>
          {item.image && (
            <Image
              src={item.image}
              alt={item.name}
              placeholder="blur"
              blurDataURL={`data:image/svg+xml;base64,${toBase64(
                shimmer(700, 500)
              )}`}
              layout="fill"
              objectFit="cover"
              objectPosition="top"
            />
          )}
        </div>

        <p
          className={classnames(styles.title, {
            'button--no-link': !hasProfile()
          })}
        >
          {item.name}
        </p>
        <p className={styles.job}>{item.job}</p>
      </div>

      <Modal
        show={openModal}
        onClose={toggleModal}
        className={styles.modal__wrapper}
      >
        <div className={styles.modal}>
          <div className={styles.modal__image}>
            <Image
              src={item.image}
              alt={item.name}
              layout="fill"
              objectFit="cover"
              objectPosition="top"
            />
          </div>

          <div className={styles.modal__content}>
            <h4 className="pb-5">
              {selectedProfile && selectedProfile.fullname}
            </h4>

            {formatText(selectedProfile && selectedProfile.bio)}
          </div>
        </div>
      </Modal>
    </>
  );
};

AboutCard.propTypes = {
  item: PropTypes.object
};
