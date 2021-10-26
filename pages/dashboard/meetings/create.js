import React from 'react';
import MeetingForm from '../../../components/dashboard/forms/meeting';
import withAuth from '../../../services/with-auth';

function NewMeeting() {
  return <MeetingForm />;
}

export default withAuth(NewMeeting);
