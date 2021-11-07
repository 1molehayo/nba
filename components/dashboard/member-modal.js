import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from '../global';

export const MemberModal = ({
  adminDialog,
  showDialog,
  toggleDialog,
  blocked,
  isAdmin,
  onSubmit
}) => {
  return (
    <Modal show={showDialog} onClose={toggleDialog} className="context__modal">
      {adminDialog && (
        <p>
          Confirm {isAdmin ? 'Degrade to Lawyer' : 'Upgrade to Admin'} Account{' '}
        </p>
      )}

      {!adminDialog && <p>Confirm {blocked ? 'Reinstate' : 'Suspension'} </p>}

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
  adminDialog: PropTypes.bool,
  blocked: PropTypes.bool,
  isAdmin: PropTypes.bool,
  onSubmit: PropTypes.func,
  showDialog: PropTypes.bool,
  toggleDialog: PropTypes.func
};
