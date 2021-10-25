import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import PropTypes from 'prop-types';
import moment from 'moment';
import {
  formatCharLength,
  getImagePath,
  shimmer,
  toBase64
} from '../../utility';
import { Modal } from './modal';

export const EventsCard = ({ item, onDelete, link }) => {
  const [openModal, setOpenModal] = useState(false);
  const toggleModal = () => setOpenModal((prevState) => !prevState);

  return (
    <>
      <div className="event-card event-card-wrapper">
        <div className="event-card__image">
          {item.image && (
            <Image
              src={getImagePath(item.image.url)}
              alt={item.title}
              placeholder="blur"
              blurDataURL={`data:image/svg+xml;base64,${toBase64(
                shimmer(700, 500)
              )}`}
              layout="fill"
              objectFit="cover"
            />
          )}

          {!item.image && (
            <div className="empty-card h-100 justify-content-center">
              <span className="font-size-m-large icon-calendar" />
            </div>
          )}

          {onDelete && (
            <button className="button button--red" onClick={onDelete}>
              delete <span className="icon-delete" />
            </button>
          )}
        </div>

        <div className="event-card-body">
          {link && (
            <Link href={link} passHref>
              <p
                role="button"
                onClick={toggleModal}
                className="event-card__title"
              >
                {item.title}
              </p>
            </Link>
          )}

          {!link && (
            <p
              role="button"
              onClick={toggleModal}
              className="event-card__title"
            >
              {item.title}
            </p>
          )}

          <p className="font-size-small mb-4">
            {formatCharLength(item.description, 100)}
          </p>

          <hr className="divider" />

          <div className="row mt-3">
            <div className="col-6">
              <p>
                <strong>Date &amp; Time</strong>
              </p>
              <p className="font-size-small">
                {moment(item.date, 'YYYY-MM-DD').format('Do MMM YYYY')},<br />
                {moment(item.time, 'HH:mm:ss').format('HH:mm')}
              </p>
            </div>

            <div className="col-6">
              <p>
                <strong>Venue</strong>
              </p>

              <p className="font-size-small">
                {formatCharLength(item.venue, 35)}
              </p>
            </div>
          </div>
        </div>
      </div>

      <Modal
        show={openModal}
        onClose={toggleModal}
        className="event-card-modal-wrapper"
      >
        <div className="event-card-modal">
          <div className="event-card-modal__image mb-5">
            {item.image && (
              <Image
                src={getImagePath(item.image.url)}
                alt={item.title}
                placeholder="blur"
                blurDataURL={`data:image/svg+xml;base64,${toBase64(
                  shimmer(700, 500)
                )}`}
                layout="fill"
                objectFit="cover"
              />
            )}

            {!item.image && (
              <div className="empty-card h-100 justify-content-center">
                <span className="font-size-m-large icon-calendar" />
              </div>
            )}

            {onDelete && (
              <button className="button button--red" onClick={onDelete}>
                delete <span className="icon-delete" />
              </button>
            )}
          </div>

          <p className="event-card__title event-card-modal__title">
            {item.title}
          </p>

          <p className="font-size-small mb-4">{item.description}</p>

          <hr className="divider mb-4" />

          <div className="mb-4">
            <p>
              <strong>Date &amp; Time</strong>
            </p>
            <p className="font-size-small">
              {moment(item.date, 'YYYY-MM-DD').format('Do MMM YYYY')},<br />
              {moment(item.time, 'HH:mm:ss').format('HH:mm')}
            </p>
          </div>

          <div className="mb-4">
            <p>
              <strong>Venue</strong>
            </p>

            <p className="font-size-small">
              {formatCharLength(item.venue, 35)}
            </p>
          </div>
        </div>
      </Modal>
    </>
  );
};

EventsCard.propTypes = {
  item: PropTypes.object,
  link: PropTypes.string,
  onDelete: PropTypes.func
};
