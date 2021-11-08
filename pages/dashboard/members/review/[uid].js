import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import withAuth from '../../../../services/with-auth';
import axios from '../../../../services/axios';
import useOnError from '../../../../services/use-on-error';
import handleApiError from '../../../../services/handle-api-error';
import { notify } from '../../../../utility';
import { MemberDetails } from '../../../../components/dashboard/member-details';
import useAuthGuard from '../../../../services/use-auth-guard';

function ProfileReview({ member, error }) {
  const [reviewing, setReviewing] = useState(false);

  const router = useRouter();

  useAuthGuard('update.profiles');

  useOnError(error);

  if (member?.active) {
    router.replace('/dashboard/members');
    return () => {};
  }

  const handleReview = async () => {
    setReviewing(true);

    try {
      const data = {
        active: true
      };

      await axios.put(`/profiles/${member.uid}`, data);

      notify({
        type: 'success',
        message: `${member.first_name}'s profile is now active`
      });

      router.replace('/dashboard/members');
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

      <div className="section pt-0">
        <div className="container">
          <h4 className="pb-5">Pending Request</h4>

          <MemberDetails member={member} />

          <div className="mt-4">
            <button
              className="button button--primary mr-2"
              onClick={handleReview}
            >
              {reviewing ? 'Loading' : 'Approve'}
            </button>

            <Link href="/dashboard/members" passHref>
              <button className="button button--red">Cancel</button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

ProfileReview.propTypes = {
  member: PropTypes.object,
  error: PropTypes.object
};

export default withAuth(ProfileReview);

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
