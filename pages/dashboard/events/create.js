import React from 'react';
import EventForm from '../../../components/dashboard/forms/event';
import useAuthGuard from '../../../services/use-auth-guard';
import withAuth from '../../../services/with-auth';

function NewEvent() {
  useAuthGuard('create.events');

  return <EventForm />;
}

export default withAuth(NewEvent);
