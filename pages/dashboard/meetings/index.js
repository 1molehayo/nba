import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { MEETING_HEADERS } from '../../../utility/constants';
import { MeetingCard, Table } from '../../../components/dashboard';
import { parseCookies } from 'nookies';
import axios from '../../../services/axios';
import moment from 'moment';
import withAuth from '../../../services/with-auth';
import { Empty } from '../../../components/global';
import { isArrayEmpty } from '../../../utility';
import useOnError from '../../../services/use-on-error';

function Meeting({ meetings, error }) {
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

      if (datetime.isSameOrAfter(new Date(), 'day')) {
        return item;
      }
    });
  };

  const getOldMeetings = (arr) => {
    if (!arr) {
      return [];
    }

    return arr.filter((item) => {
      const date = moment(item.date).format('DD/MM/YYYY');
      const datetime = moment(`${date} HH:mm:ss`, 'DD/MM/YYYY hh:mm:ss', true);

      if (datetime.isBefore(new Date(), 'day')) {
        return item;
      }
    });
  };

  return (
    <section className="section pt-0">
      <Head>
        <title>Meeting | NBA-Ikeja</title>
      </Head>

      <div className="container">
        <div className="section pt-0">
          <div className="d-flex justify-content-between pb-5">
            <h4>Upcoming Meetings</h4>

            <Link href="/dashboard/meetings/create" passHref>
              <button className="button button--primary">Create meeting</button>
            </Link>
          </div>

          {isArrayEmpty(getUpcomingMeetings(meetings)) && (
            <Empty
              className="mt-5 color-black"
              icon="icon-meeting"
              desc="No meetings available"
            />
          )}

          <div className="row">
            {getUpcomingMeetings(meetings).map((item, i) => (
              <div className="col-6" key={i}>
                <MeetingCard item={item} />
              </div>
            ))}
          </div>
        </div>

        {!isArrayEmpty(getOldMeetings(meetings)) && (
          <div className="section pt-0">
            <h4 className="pb-5">Meeting History</h4>

            <Table headers={MEETING_HEADERS}>
              {meetings &&
                getOldMeetings(meetings).map((imeeting, j) => (
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
