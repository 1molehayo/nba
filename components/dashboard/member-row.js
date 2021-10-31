import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Context } from '../global';
import useOnClickOutside from '../../services/use-on-click-outside';
import { MemberModal } from './member-modal';

export const MemberRow = ({ member, index, onToggleActivate }) => {
  const [showContext, setShowContext] = useState(false);
  const toggleContext = () => setShowContext((prevState) => !prevState);
  const [showDialog, setShowDialog] = useState(false);
  const toggleDialog = () => setShowDialog((prevState) => !prevState);

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
        <td>{`${member.first_name} ${member.last_name}`}</td>
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
        onSubmit={() => {
          onToggleActivate(member);
          toggleDialog();
        }}
      />
    </>
  );
};

MemberRow.propTypes = {
  index: PropTypes.number,
  member: PropTypes.object,
  onToggleActivate: PropTypes.func
};
