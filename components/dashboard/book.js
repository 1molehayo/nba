import React, { useState } from 'react';
import Image from 'next/image';
import styles from '../../styles/dashboard/components/book.module.scss';
import PropTypes from 'prop-types';
import { formatCharLength } from '../../utility';
import { Modal } from '../app';
import dynamic from 'next/dynamic';

export const Book = ({ item }) => {
  const [openModal, setOpenModal] = useState(false);
  const toggleModal = () => setOpenModal((prevState) => !prevState);

  const PdfViewer = dynamic(() => import('./pdf-reader'), { ssr: false });

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.image}>
          <Image src={item.image} width={108} height={150} objectFit="cover" />
        </div>

        <div className={styles.content}>
          <div>
            <p className={styles.title}>{item.title}</p>
            <p className={styles.author}>
              <em>{item.author}</em>
            </p>
            <p className={styles.desc}>
              {formatCharLength(item.description, 80)}
            </p>
          </div>

          <button className="button button--primary" onClick={toggleModal}>
            Read now
          </button>
        </div>
      </div>

      <Modal
        show={openModal}
        onClose={toggleModal}
        className={styles.modal__wrapper}
      >
        <div className={styles.modal}>
          <PdfViewer />
        </div>
      </Modal>
    </>
  );
};

Book.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    author: PropTypes.string,
    publisher: PropTypes.string,
    image: PropTypes.string,
    description: PropTypes.string
  })
};
