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

function ProfileDetails({ member, error }) {
  const [loading, setLoading] = useState(false);
  const [blocked, setBlocked] = useState(member.blocked);
  const [showDialog, setShowDialog] = useState(false);
  const toggleDialog = () => setShowDialog((prevState) => !prevState);

  useOnError(error);

  const handleSubmit = async () => {
    setLoading(true);

    try {
      const data = {
        blocked: !blocked
      };

      await axios.put(`/users/${member.uid}`, data);

      notify({
        type: 'success',
        message: `${member.first_name}'s profile is now ${
          !blocked ? 'suspended' : 'active'
        }`
      });

      setBlocked(!member.blocked);
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
              status={blocked ? 'blocked' : 'active'}
            />

            <div className="mt-4">
              {!blocked && (
                <button
                  className="button button--primary mr-2"
                  onClick={handleSubmit}
                >
                  {loading ? 'Loading' : 'Suspend'}
                </button>
              )}

              {blocked && (
                <button
                  className="button button--primary mr-2"
                  onClick={toggleDialog}
                >
                  {loading ? 'Loading' : 'Reinstate'}
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
        blocked={blocked}
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
