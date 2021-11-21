import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import PropTypes from 'prop-types';
import withAuth from '../../../services/with-auth';
import { getPermissions } from '../../../utility';
import { useCurrentUser } from '../../../contexts/current-user';
import useAuthGuard from '../../../services/use-auth-guard';
import UpcomingMeetings from '../../../components/dashboard/meetings/upcoming-meetings';
import PastMeetings from '../../../components/dashboard/meetings/past-meetings';

function Meeting() {
  const { role } = useCurrentUser();

  useAuthGuard('find.meetings');

  return (
    <section className="section pt-0">
      <Head>
        <title>Meetings | NBA-Ikeja</title>
      </Head>

      <div className="container">
        <div className="section pt-0">
          <div className="header-title-block">
            <h4>Upcoming Meetings</h4>

            {getPermissions(role).includes('create.meetings') && (
              <Link href="/dashboard/meetings/create" passHref>
                <button className="button button--primary">
                  Create meeting
                </button>
              </Link>
            )}
          </div>

          <UpcomingMeetings />
        </div>

        <PastMeetings />
      </div>
    </section>
  );
}

Meeting.propTypes = {
  error: PropTypes.object,
  meetings: PropTypes.array
};

export default withAuth(Meeting);
