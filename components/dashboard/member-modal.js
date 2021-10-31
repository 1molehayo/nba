import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from '../global';

export const MemberModal = ({
  showDialog,
  toggleDialog,
  blocked,
  onSubmit
}) => {
  return (
    <Modal show={showDialog} onClose={toggleDialog} className="context__modal">
      <p>Confirm {blocked ? 'Reinstate' : 'Suspension'} </p>

      <div className="context__modal-buttons">
        <button className="button button--primary mr-2" onClick={onSubmit}>
          Yes
        </button>

        <button className="button button--red" onClick={toggleDialog}>
          No
        </button>
      </div>
    </Modal>
  );
};

MemberModal.propTypes = {
  blocked: PropTypes.bool,
  onSubmit: PropTypes.func,
  showDialog: PropTypes.bool,
  toggleDialog: PropTypes.func
};
