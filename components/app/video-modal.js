import React from 'react';
import PropTypes from 'prop-types';
import ReactPlayer from 'react-player/youtube';
import { VIDEO_PLAYER_SETTINGS } from '../../utility/constants';
import { Modal } from '../global/modal';

export const VideoModal = ({ link, show, onClose }) => {
  return (
    <Modal show={show} onClose={onClose}>
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
    </Modal>
  );
};

VideoModal.propTypes = {
  link: PropTypes.string,
  onClose: PropTypes.func,
  show: PropTypes.bool
};
