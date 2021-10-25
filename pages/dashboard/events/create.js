import React from 'react';
import EventForm from '../../../components/dashboard/forms/event';
import withAuth from '../../../services/with-auth';

function NewEvent() {
  return <EventForm />;
}

export default withAuth(NewEvent);
