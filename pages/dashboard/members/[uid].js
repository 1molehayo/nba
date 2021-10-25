import React, { useState } from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';
import withAuth from '../../../services/with-auth';
import axios from '../../../services/axios';
import useOnError from '../../../services/use-on-error';
import handleApiError from '../../../services/handle-api-error';
import { notify } from '../../../utility';

function MemberDetails({ member, error }) {
  const [reviewing, setReviewing] = useState(false);

  useOnError(error);

  const handleReview = async () => {
    setReviewing(true);

    try {
      await axios.put(`/profiles/${member.uid}`);
      notify({
        type: 'success',
        message: `${member.first_name}'s profile is now active`
      });
    } catch (err) {
      const errorObj = handleApiError(err);
      notify({
        type: 'error',
        message: errorObj.message
      });
    } finally {
      setReviewing(false);
    }
  };

  return (
    <section>
      <Head>
        <title>Members | NBA-Ikeja</title>
      </Head>

      <div className="section"></div>
    </section>
  );
}

MemberDetails.propTypes = {
  member: PropTypes.object,
  error: PropTypes.object
};

export default withAuth(MemberDetails);

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
