import React from 'react';
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';
import classnames from 'classnames';

export const Modal = ({ children, className, show, onClose }) => {
  return (
    <ReactModal
      isOpen={show}
      onRequestClose={onClose}
      className={classnames('modal-content', className)}
      role="dialog"
      ariaHideApp={false}
    >
      <div className="modal-body">
        <div className="modal-close close-icon" onClick={onClose}>
          <span></span>
          <span></span>
        </div>

        {children}
      </div>
    </ReactModal>
  );
};

Modal.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  onClose: PropTypes.func,
  show: PropTypes.bool
};
