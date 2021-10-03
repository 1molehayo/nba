import React from 'react';
import Head from 'next/head';
import { PaymentCard, Table } from '../../components/dashboard';
import { PAYMENT_DETAILS, PAYMENT_HEADERS } from '../../utility/constants';
import { getStatus } from '../../utility';

export default function Payments() {
  return (
    <section className="section pt-0">
      <Head>
        <title>Payments | NBA-Ikeja</title>
      </Head>

      <div className="container">
        <div className="section pt-0">
          <h4 className="pb-5">Payments</h4>

          <div className="row">
            <div className="col-md-6 col-xl-5 mb-4">
              <PaymentCard title="Annual dues" amount={30000} />
            </div>

            <div className="col-md-6 col-xl-5 mb-4">
              <PaymentCard title="Monthly dues" amount={5000} />
            </div>
          </div>
        </div>

        <div className="section pt-0">
          <h4 className="pb-5">Payment History</h4>

          <Table headers={PAYMENT_HEADERS}>
            {PAYMENT_DETAILS.map((item, i) => (
              <tr key={i}>
                <td>{item.title}</td>
                <td>{getStatus(item.status)}</td>
                <td>{item.date}</td>
              </tr>
            ))}
          </Table>
        </div>
      </div>
    </section>
  );
}
