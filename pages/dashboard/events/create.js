import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import EventForm from '../../../components/dashboard/forms/event';
import { useCurrentUser } from '../../../contexts/current-user';
import withAuth from '../../../services/with-auth';
import { getPermissions } from '../../../utility';

function NewEvent() {
  const router = useRouter();
  const { role } = useCurrentUser();

  useEffect(() => {
    if (!getPermissions(role).includes('create.events')) {
      router.replace('/dashboard/events');
    }
  }, [role, router]);

  return <EventForm />;
}

export default withAuth(NewEvent);
