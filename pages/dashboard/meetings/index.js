import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { parseCookies } from 'nookies';
import moment from 'moment';
import { MEETING_HEADERS } from '../../../utility/constants';
import { MeetingCard, Table } from '../../../components/dashboard';
import axios from '../../../services/axios';
import withAuth from '../../../services/with-auth';
import { Empty, Loader } from '../../../components/global';
import { getPermissions, isArrayEmpty, notify } from '../../../utility';
import useOnError from '../../../services/use-on-error';
import handleApiError from '../../../services/handle-api-error';
import { useCurrentUser } from '../../../contexts/current-user';

function Meeting({ meetings, error }) {
  const [meetingData, setMeetings] = useState(meetings);
  const [deleting, setDeleting] = useState(false);
  const { role } = useCurrentUser();

  useOnError(error);

  const getUpcomingMeetings = (arr) => {
    if (!arr) {
      return [];
    }

    return arr.filter((item) => {
      const date = moment(item.date).format('DD/MM/YYYY');
      const datetime = moment(
        `${date} ${item.time}`,
        'DD/MM/YYYY HH:mm:ss',
        true
      );

      return datetime.isSameOrAfter(new Date(), 'day');
    });
  };

  const getOldMeetings = (arr) => {
    if (!arr) {
      return [];
    }

    return arr.filter((item) => {
      const date = moment(item.date).format('DD/MM/YYYY');
      const datetime = moment(`${date} HH:mm:ss`, 'DD/MM/YYYY hh:mm:ss', true);

      return datetime.isBefore(new Date(), 'day');
    });
  };

  const handleDelete = async (id) => {
    setDeleting(true);
    try {
      await axios.delete(`/meetings/${id}`);
      const arr = meetingData.filter((item) => item.id !== id);
      setMeetings(arr);

      notify({
        type: 'success',
        message: 'Meeting deleted successfully'
      });
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
    <section className="section pt-0">
      <Head>
        <title>Meetings | NBA-Ikeja</title>
      </Head>

      {deleting && <Loader />}

      <div className="container">
        <div className="section pt-0">
          <div className="d-flex justify-content-between pb-5">
            <h4>Upcoming Meetings</h4>

            <Link href="/dashboard/meetings/create" passHref>
              <button className="button button--primary">Create meeting</button>
            </Link>
          </div>

          {isArrayEmpty(getUpcomingMeetings(meetingData)) && (
            <Empty
              className="mt-5 color-black"
              icon="icon-meeting"
              desc="No meetings available"
            />
          )}

          <div className="row">
            {getUpcomingMeetings(meetingData).map((item, i) => (
              <div className="col-6" key={i}>
                <MeetingCard
                  item={item}
                  link={
                    getPermissions(role).includes('update.meetings')
                      ? `/dashboard/meetings/${item.slug}`
                      : null
                  }
                  onDelete={
                    getPermissions(role).includes('delete.meetings')
                      ? () => handleDelete(item.id)
                      : null
                  }
                />
              </div>
            ))}
          </div>
        </div>

        {!isArrayEmpty(getOldMeetings(meetingData)) && (
          <div className="section pt-0">
            <h4 className="pb-5">Meeting History</h4>

            <Table headers={MEETING_HEADERS}>
              {getOldMeetings(meetingData).map((imeeting, j) => (
                <tr key={j}>
                  <td>{imeeting.title}</td>
                  <td>{imeeting.description}</td>
                  <td>{moment(imeeting.date, 'DD/MM/YYYY')}</td>
                  <td>{imeeting.time}</td>
                </tr>
              ))}
            </Table>
          </div>
        )}
      </div>
    </section>
  );
}

Meeting.propTypes = {
  error: PropTypes.object,
  meetings: PropTypes.array
};

export default withAuth(Meeting);

export async function getServerSideProps(ctx) {
  const cookies = parseCookies(ctx);
  const config = {
    headers: {
      Authorization: `Bearer ${cookies.token}`
    }
  };

  let meetings = null;
  let error = {};

  try {
    const { data } = await axios.get('/meetings', config);
    meetings = data;
  } catch (err) {
    error = handleApiError(err);
  } finally {
    return {
      props: {
        meetings,
        error
      } // will be passed to the page component as props
    };
  }
}
