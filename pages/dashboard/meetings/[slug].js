import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { parseCookies } from 'nookies';
import axios from '../../../services/axios';
import MeetingForm from '../../../components/dashboard/forms/meeting';
import withAuth from '../../../services/with-auth';
import handleApiError from '../../../services/handle-api-error';
import useOnError from '../../../services/use-on-error';
import { useCurrentUser } from '../../../contexts/current-user';
import { getPermissions, notify } from '../../../utility';
import { Loader } from '../../../components/global';

function MeetingDetails({ error, meeting }) {
  const [deleting, setDeleting] = useState(false);
  const router = useRouter();
  const { role } = useCurrentUser();

  useOnError(error);

  useEffect(() => {
    if (!getPermissions(role).includes('update.books')) {
      router.replace('/dashboard/library');
    }
  }, [role, router]);

  const handleDelete = async () => {
    setDeleting(true);

    try {
      await axios.delete(`/meetings/${meeting.id}`);

      notify({
        type: 'success',
        message: 'Meeting deleted successfully'
      });

      router.replace('/dashboard/meetings');
    } catch (err) {
      const errorObj = handleApiError(err);

      notify({
        type: 'error',
        message: errorObj.message
      });
    } finally {
      setDeleting(false);
    }
  };

  return (
    <>
      {deleting && <Loader />}
      <MeetingForm
        data={meeting}
        onDelete={
          getPermissions(role).includes('delete.events') ? handleDelete : null
        }
      />
    </>
  );
}

export default withAuth(MeetingDetails);

MeetingDetails.propTypes = {
  error: PropTypes.object,
  meeting: PropTypes.object
};

export async function getServerSideProps(ctx) {
  const cookies = parseCookies(ctx);
  const config = {
    headers: {
      Authorization: `Bearer ${cookies.token}`
    }
  };

  let meeting = null;
  let error = {};

  try {
    const { slug } = ctx.params;
    const { data } = await axios.get(`/meetings?slug=${slug}`, config);
    meeting = { ...data[0] };
  } catch (err) {
    error = handleApiError(err);
  } finally {
    return {
      props: {
        error,
        meeting
      }
    };
  }
}
