import React from 'react';
import Head from 'next/head';
import { MEETINGS, MEETING_HEADERS } from '../../utility/constants';
import { MeetingCard, Table } from '../../components/dashboard';

export default function Meeting() {
  return (
    <section className="section pt-0">
      <Head>
        <title>Meeting | NBA-Ikeja</title>
      </Head>

      <div className="container">
        <div className="section pt-0">
          <h4 className="pb-5">New Meetings</h4>

          <div className="row">
            {MEETINGS.map((item, i) => (
              <div className="col-6" key={i}>
                <MeetingCard item={item} />
              </div>
            ))}
          </div>
        </div>

        <div className="section pt-0">
          <h4 className="pb-5">Meeting History</h4>

          <Table headers={MEETING_HEADERS}>
            {MEETINGS.map((imeeting, j) => (
              <tr key={j}>
                <td>{imeeting.title}</td>
                <td>{imeeting.description}</td>
                <td>{imeeting.date}</td>
                <td>{imeeting.time}</td>
              </tr>
            ))}
          </Table>
        </div>
      </div>
    </section>
  );
}
