import React from 'react';
import MeetingForm from '../../../components/dashboard/forms/meeting';
import useAuthGuard from '../../../services/use-auth-guard';
import withAuth from '../../../services/with-auth';

function NewMeeting() {
  useAuthGuard('create.meetings');

  return <MeetingForm />;
}

export default withAuth(NewMeeting);
