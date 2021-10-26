import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { parseCookies } from 'nookies';
import axios from '../../../services/axios';
import useOnError from '../../../services/use-on-error';
import handleApiError from '../../../services/handle-api-error';
import withAuth from '../../../services/with-auth';
import EventForm from '../../../components/dashboard/forms/event';
import { Loader } from '../../../components/global';
import { useCurrentUser } from '../../../contexts/current-user';
import { getPermissions, notify } from '../../../utility';

function EventDetails({ event, error }) {
  const [deleting, setDeleting] = useState(false);
  const router = useRouter();
  const { role } = useCurrentUser();

  useOnError(error);

  useEffect(() => {
    if (!getPermissions(role).includes('update.events')) {
      router.replace('/dashboard/events');
    }
  }, [role, router]);

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

  return (
    <>
      {deleting && <Loader />}

      <EventForm
        data={event}
        onDelete={
          getPermissions(role).includes('delete.events') ? handleDelete : null
        }
      />
    </>
  );
}

EventDetails.propTypes = {
  event: PropTypes.object,
  error: PropTypes.object
};

export default withAuth(EventDetails);

export async function getServerSideProps(ctx) {
  const cookies = parseCookies(ctx);
  const config = {
    headers: {
      Authorization: `Bearer ${cookies.token}`
    }
  };

  let event = null;
  let error = {};

  try {
    const { slug } = ctx.params;
    const { data } = await axios.get(`/events?slug=${slug}`, config);
    event = { ...data[0] };
  } catch (err) {
    error = handleApiError(err);
  } finally {
    return {
      props: {
        event,
        error
      }
    };
  }
}
