import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import axios from '../../../services/axios';
import MeetingForm from '../../../components/dashboard/forms/meeting';
import withAuth from '../../../services/with-auth';
import handleApiError from '../../../services/handle-api-error';
import useOnError from '../../../services/use-on-error';
import { useCurrentUser } from '../../../contexts/current-user';
import { getPermissions, notify } from '../../../utility';
import { Loader } from '../../../components/global';
import useAuthGuard from '../../../services/use-auth-guard';
import useFetch from '../../../services/use-fetch';
import { FETCHING } from '../../../utility/constants';

function MeetingDetails({ slug }) {
  const [deleting, setDeleting] = useState(false);
  const router = useRouter();
  const { role } = useCurrentUser();

  useAuthGuard('update.meetings');

  const { data: meeting, error, status } = useFetch(`/meetings?slug=${slug}`);

  useOnError(error);

  const handleDelete = async () => {
    setDeleting(true);

    try {
      await axios.delete(`/meetings/${meeting[0].id}`);

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
      {(deleting || status === FETCHING) && <Loader />}
      <MeetingForm
        data={meeting ? meeting[0] : null}
        onDelete={
          getPermissions(role).includes('delete.events') ? handleDelete : null
        }
      />
    </>
  );
}

export default withAuth(MeetingDetails);

MeetingDetails.propTypes = {
  slug: PropTypes.string
};

export async function getServerSideProps(ctx) {
  const { slug } = ctx.params;

  return {
    props: {
      slug
    }
  };
}
