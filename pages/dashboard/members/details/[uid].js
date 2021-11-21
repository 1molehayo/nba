import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import PropTypes from 'prop-types';
import withAuth from '../../../../services/with-auth';
import axios from '../../../../services/axios';
import useOnError from '../../../../services/use-on-error';
import handleApiError from '../../../../services/handle-api-error';
import { notify } from '../../../../utility';
import { MemberDetails } from '../../../../components/dashboard/member-details';
import { MemberModal } from '../../../../components/dashboard';
import useAuthGuard from '../../../../services/use-auth-guard';
import { DEFAULT_ROLE_TYPE } from '../../../../utility/constants';

function ProfileDetails({ member, error }) {
  const [memberData, setMember] = useState(member);
  const [loading, setLoading] = useState(false);
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

  useAuthGuard('update.profiles');

  useOnError(error);

  const onToggleActivate = async () => {
    setLoading(true);

    try {
      const updateData = {
        blocked: !memberData.blocked
      };

      const { data } = await axios.put(`/users/${memberData.uid}`, updateData);

      notify({
        type: 'success',
        message: `${memberData.first_name}'s profile is now ${
          data.blocked ? 'suspended' : 'active'
        }`
      });

      setMember(data);
    } catch (err) {
      const errorObj = handleApiError(err);
      notify({
        type: 'error',
        message: errorObj.message
      });
    } finally {
      setLoading(false);
    }
  };

  const onToggleAdmin = async () => {
    setLoading(true);

    try {
      const updateData = {
        role:
          memberData.role.type === 'administrator'
            ? DEFAULT_ROLE_TYPE
            : 'administrator'
      };

      const newData = await axios.put(`/users/${memberData.uid}`, updateData);

      setMember(newData);

      notify({
        type: 'success',
        message: `${memberData.first_name}'s profile has been ${
          newData.role.type === 'administrator'
            ? 'upgraded to administrator account'
            : 'degraded to lawyer account'
        }`
      });
    } catch (err) {
      const errorObj = handleApiError(err);

      notify({
        type: 'error',
        message: errorObj.message
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = () => {
    if (adminDialog) {
      onToggleAdmin(member);
    } else {
      onToggleActivate(member);
    }
  };

  return (
    <section>
      <Head>
        <title>Members | NBA-Ikeja</title>
      </Head>

      <div className="section">
        <div className="section pt-0">
          <div className="container">
            <h4 className="pb-5">Pending Request</h4>

            <MemberDetails
              member={member}
              status={memberData.blocked ? 'blocked' : 'active'}
            />

            <div className="mt-4">
              {memberData.role.type === DEFAULT_ROLE_TYPE && (
                <button
                  className="button button--primary mr-2"
                  onClick={() => toggleDialog('admin')}
                >
                  {loading ? 'Loading' : 'Make Admin'}
                </button>
              )}

              {memberData.role.type !== DEFAULT_ROLE_TYPE && (
                <button
                  className="button button--primary mr-2"
                  onClick={() => toggleDialog('admin')}
                >
                  {loading ? 'Loading' : 'Remove admin'}
                </button>
              )}

              {memberData.blocked && (
                <button
                  className="button button--primary mr-2"
                  onClick={toggleDialog}
                >
                  {loading ? 'Loading' : 'Reinstate'}
                </button>
              )}

              {!memberData.blocked && (
                <button
                  className="button button--primary mr-2"
                  onClick={toggleDialog}
                >
                  {loading ? 'Loading' : 'Suspend'}
                </button>
              )}

              <Link href="/dashboard/members" passHref>
                <button className="button button--red">Cancel</button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <MemberModal
        showDialog={showDialog}
        toggleDialog={toggleDialog}
        blocked={memberData.blocked}
        isAdmin={memberData.role.type !== DEFAULT_ROLE_TYPE}
        adminDialog={adminDialog}
        onSubmit={handleSubmit}
      />
    </section>
  );
}

ProfileDetails.propTypes = {
  member: PropTypes.object,
  error: PropTypes.object
};

export default withAuth(ProfileDetails);

export async function getServerSideProps({ params }) {
  let member = null;
  let error = {};

  try {
    const { uid } = params;
    const { data } = await axios.get(`/profiles?uid=${uid}`);
    member = { ...data[0] };
  } catch (err) {
    error = handleApiError(err);
  } finally {
    return {
      props: {
        member,
        error
      }
    };
  }
}