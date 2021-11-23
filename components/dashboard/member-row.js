import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Context } from '../global';
import useOnClickOutside from '../../services/use-on-click-outside';
import { MemberModal } from './member-modal';
import { DEFAULT_ROLE_TYPE } from '../../utility/constants';
import { capitalizeFirstLetter } from '../../utility';

export const MemberRow = ({
  member,
  index,
  onToggleActivate,
  onToggleAdmin
}) => {
  const [showContext, setShowContext] = useState(false);
  const toggleContext = () => setShowContext((prevState) => !prevState);
  const [showDialog, setShowDialog] = useState(false);
  const [adminDialog, setAdminDialog] = useState(false);

  const toggleDialog = (val) => {
    if (val === 'admin') {
      setAdminDialog(true);
    } else {
      setAdminDialog(false);
    }
    return setShowDialog((prevState) => !prevState);
  };

  const onSubmit = () => {
    if (adminDialog) {
      onToggleAdmin(member);
    } else {
      onToggleActivate(member);
    }

    toggleDialog();
  };

  const contextRef = useRef(null);

  useOnClickOutside(contextRef, () => setShowContext(false));

  const getStatus = (user) => {
    if (!user.active) {
      return <span className="color-orange">Pending</span>;
    }

    if (user.blocked) {
      return <span className="color-red">Suspended</span>;
    }

    return <span className="color-green">Active</span>;
  };

  return (
    <>
      <tr>
        <td>{index}</td>
        <td>{`${capitalizeFirstLetter(
          member.first_name
        )} ${capitalizeFirstLetter(member.last_name)}`}</td>
        <td>{member.court_number}</td>
        <td>{getStatus(member)}</td>
        <td className="table-icon-wrapper" ref={contextRef}>
          <button
            className="table-icon"
            id={`${showContext}`}
            onClick={toggleContext}
          >
            <span className="icon-ellipsis" />
          </button>

          {showContext && (
            <Context>
              {!member.active && (
                <Link href={`/dashboard/members/review/${member.uid}`} passHref>
                  <li className="context__item">Review</li>
                </Link>
              )}

              {member.active && (
                <>
                  <Link
                    href={`/dashboard/members/details/${member.uid}`}
                    passHref
                  >
                    <li className="context__item">View profile</li>
                  </Link>

                  <hr className="divider" />

                  {member.role.type === DEFAULT_ROLE_TYPE && (
                    <li
                      className="context__item"
                      onClick={() => toggleDialog('admin')}
                    >
                      Make admin
                    </li>
                  )}

                  {member.role.type !== DEFAULT_ROLE_TYPE && (
                    <li
                      className="context__item"
                      onClick={() => toggleDialog('admin')}
                    >
                      Remove admin
                    </li>
                  )}

                  <hr className="divider" />

                  {member.blocked && (
                    <li className="context__item" onClick={toggleDialog}>
                      Reinstate
                    </li>
                  )}

                  {!member.blocked && (
                    <li className="context__item" onClick={toggleDialog}>
                      Suspend
                    </li>
                  )}
                </>
              )}
            </Context>
          )}
        </td>
      </tr>

      <MemberModal
        showDialog={showDialog}
        toggleDialog={toggleDialog}
        blocked={member.blocked}
        isAdmin={member.role?.type !== DEFAULT_ROLE_TYPE}
        adminDialog={adminDialog}
        onSubmit={onSubmit}
      />
    </>
  );
};

MemberRow.propTypes = {
  index: PropTypes.number,
  member: PropTypes.object,
  onToggleActivate: PropTypes.func,
  onToggleAdmin: PropTypes.func
};
