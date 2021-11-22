import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import axios from '../../../services/axios';
import useOnError from '../../../services/use-on-error';
import handleApiError from '../../../services/handle-api-error';
import withAuth from '../../../services/with-auth';
import EventForm from '../../../components/dashboard/forms/event';
import { Loader } from '../../../components/global';
import { useCurrentUser } from '../../../contexts/current-user';
import { getPermissions, notify } from '../../../utility';
import useAuthGuard from '../../../services/use-auth-guard';
import useFetch from '../../../services/use-fetch';
import { FETCHING } from '../../../utility/constants';

function EventDetails({ slug }) {
  const [deleting, setDeleting] = useState(false);
  const router = useRouter();
  const { role } = useCurrentUser();

  useAuthGuard('update.events');

  const { data: event, error, status } = useFetch(`/events?slug=${slug}`, true);

  useOnError(error);

  const handleDelete = async () => {
    setDeleting(true);

    try {
      await axios.delete(`/events/${event.id}`);

      notify({
        type: 'success',
        message: 'Event deleted successfully'
      });

      router.replace('/dashboard/events');
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

  if (deleting || status === FETCHING) {
    return <Loader />;
  }

  return (
    <>
      <EventForm
        data={event || null}
        onDelete={
          getPermissions(role).includes('delete.events') ? handleDelete : null
        }
      />
    </>
  );
}

EventDetails.propTypes = {
  slug: PropTypes.string
};

export default withAuth(EventDetails);

export async function getServerSideProps(ctx) {
  const { slug } = ctx.params;

  return {
    props: {
      slug
    }
  };
}
