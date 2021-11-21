import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';
import classnames from 'classnames';
import styles from '../../styles/dashboard/components/book.module.scss';
import {
  formatCharLength,
  getImagePath,
  shimmer,
  toBase64
} from '../../utility';
import { Modal } from '../global';
import { TEXT_RESTRICTIONS } from '../../utility/constants';

export const Book = ({ item, link, onDelete }) => {
  const [openModal, setOpenModal] = useState(false);
  const toggleModal = () => setOpenModal((prevState) => !prevState);

  const PdfViewer = dynamic(() => import('./pdf-reader'), { ssr: false });

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.image}>
          {item.image && (
            <Image
              src={getImagePath(item.image.formats.thumbnail.url)}
              placeholder="blur"
              blurDataURL={`data:image/svg+xml;base64,${toBase64(
                shimmer(108, 150)
              )}`}
              alt={item.title}
              width={108}
              height={150}
              objectFit="cover"
            />
          )}

          {!item.image && (
            <div className="empty-card h-100 justify-content-center">
              <span className="font-size-m-large icon-book" />
            </div>
          )}

          {onDelete && (
            <button className="button button--red" onClick={onDelete}>
              delete <span className="icon-delete" />
            </button>
          )}
        </div>

        <div className={styles.content}>
          <div>
            {link && (
              <Link href={link} passHref>
                <p
                  role="link"
                  className={classnames(styles.title, styles.title__link)}
                >
                  {item.title}
                </p>
              </Link>
            )}

            {!link && <p className={styles.title}>{item.title}</p>}

            <p className={styles.author}>
              <em>{item.author}</em>
            </p>
            <p className={styles.desc}>
              {formatCharLength(item.description, TEXT_RESTRICTIONS.short_text)}
            </p>
          </div>

          <button className="button button--primary" onClick={toggleModal}>
            Read now
          </button>
        </div>
      </div>

      {item.file && (
        <Modal
          show={openModal}
          onClose={toggleModal}
          className={styles.modal__wrapper}
        >
          <div className={styles.modal}>
            <PdfViewer url={getImagePath(item.file.url)} />
          </div>
        </Modal>
      )}
    </>
  );
};

Book.propTypes = {
  item: PropTypes.shape({
    author: PropTypes.string,
    description: PropTypes.string,
    file: PropTypes.object,
    id: PropTypes.number,
    image: PropTypes.object,
    slug: PropTypes.string,
    title: PropTypes.string
  }),
  link: PropTypes.string,
  onDelete: PropTypes.func
};
