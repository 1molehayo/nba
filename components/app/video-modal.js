import React from 'react';
import PropTypes from 'prop-types';
import ReactPlayer from 'react-player/youtube';
import ReactModal from 'react-modal';
import { VIDEO_PLAYER_SETTINGS } from '../../utility/constants';

export const VideoModal = ({ link, show, onClose }) => {
  return (
    <ReactModal
      isOpen={show}
      onRequestClose={onClose}
      className="modal-content"
      role="dialog"
      ariaHideApp={false}
    >
      <div className="modal-body">
        <div className="modal-close close-icon" onClick={onClose}>
          <span></span>
          <span></span>
        </div>

        <div className="player-wrapper">
          <ReactPlayer
            url={link}
            className="react-player"
            width={VIDEO_PLAYER_SETTINGS.width}
            height={VIDEO_PLAYER_SETTINGS.height}
            config={VIDEO_PLAYER_SETTINGS.config}
            controls={false}
          />
        </div>
      </div>
    </ReactModal>
  );
};

VideoModal.propTypes = {
  link: PropTypes.string,
  onClose: PropTypes.func,
  show: PropTypes.bool
};
