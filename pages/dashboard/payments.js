/* eslint-disable no-underscore-dangle */
import React, { useCallback, useEffect, useState } from 'react';
import Head from 'next/head';
// import moment from 'moment';
import axios from '../../services/axios';
import handleApiError from '../../services/handle-api-error';
import withAuth from '../../services/with-auth';
import useOnError from '../../services/use-on-error';
import { PaymentCard } from '../../components/dashboard';
// import Pagination from '../../components/global/pagination';
// import {
//   PAGE_SIZE,
//   PAYMENT_DATE_FORMAT,
//   PAYMENT_HEADERS
// } from '../../utility/constants';
import {
  isArrayEmpty
  // formatPrice,
  // getStartPage,
  // getStatus,
  // setTableIndex
} from '../../utility';
import { Empty } from '../../components/global';

// const DEFAULT_QUERY = { _limit: PAGE_SIZE, _sort: 'updated_at:DESC' };

function Payments() {
  const [errorData, setError] = useState();
  const [dues, setDues] = useState([]);
  // const [paymentsData, setPayments] = useState([]);

  // Disable payment history for now
  // const [currentPage, setCurrentPage] = useState(1);
  // const [paymentsDataCount, setPaymentsCount] = useState(0);
  // const [filterData, setFilter] = useState({
  //   title: '',
  //   status: ''
  // });
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(false);
  // const [query, setQuery] = useState(DEFAULT_QUERY);

  useOnError(errorData);

  const fetchDues = useCallback(async () => {
    const { data } = await axios.get('/dues');
    setDues(data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchPayments = useCallback(async () => {
    // const { data } = await axios.get('/payments/me', {
    //   params: query
    // });
    // setPayments(data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchPaymentsCount = useCallback(async () => {
    // const { data } = await axios.get('/payments/count');
    // setPaymentsCount(data);
  }, []);

  const fetchData = useCallback(() => {
    Promise.all([fetchDues(), fetchPayments(), fetchPaymentsCount()])
      .then(() => {
        setLoading(false);
      })
      .catch((err) => {
        setError(handleApiError(err));
        setLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // handles reset for payment history
  // const resetData = async () => {
  //   const { data } = await axios.get('/payments/me', {
  //     params: DEFAULT_QUERY
  //   });

  //   setPayments(data);
  //   setQuery(DEFAULT_QUERY);

  //   const { data: countData } = await axios.get('/payments/count');
  //   setPaymentsCount(countData);
  // };

  // handles filter for payment history
  // const handleFilter = async () => {
  //   setLoading(true);

  //   try {
  //     const newQuery = {
  //       ...query,
  //       title_contains: filterData.title,
  //       status: filterData.status
  //     };

  //     const { data } = await axios.get('/payments/me', {
  //       params: { ...newQuery, _limit: PAGE_SIZE }
  //     });
  //     setPayments(data);

  //     const countQuery = { ...newQuery };
  //     delete countQuery._limit;
  //     const countResponse = await axios.get('/payments/count', {
  //       params: countQuery
  //     });
  //     setPaymentsCount(countResponse.data);
  //   } catch (err) {
  //     setError(handleApiError(err));
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // handles clear filter for payment history
  // const onClear = async () => {
  //   await resetData();
  //   setCurrentPage(1);
  //   setFilter({
  //     title: '',
  //     status: ''
  //   });
  // };

  // handles page change for payment history
  // const handlePageChange = async (page) => {
  //   setLoading(true);

  //   try {
  //     const newQuery = {
  //       ...query,
  //       _start: getStartPage(page)
  //     };
  //     const { data } = await axios.get('/payments/me', { params: newQuery });
  //     setPayments(data);
  //     setCurrentPage(page);
  //   } catch (err) {
  //     setError(handleApiError(err));
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <section className="section pt-0">
      <Head>
        <title>Payments | NBA-Ikeja</title>
      </Head>

      <div className="container">
        <div className="section pt-0">
          <h4 className="pb-5">Payments</h4>

          {isArrayEmpty(dues) && (
            <Empty
              className="mt-5 color-primary"
              icon="icon-card"
              desc="No dues available"
            />
          )}

          <div className="row">
            {dues.map((due, j) => (
              <div className="col-md-6 col-xl-5 mb-4" key={j}>
                <PaymentCard
                  title={due.title}
                  slug={due.slug}
                  amount={due.amount}
                  formLabel={due.form}
                  url={due.url}
                />
              </div>
            ))}
          </div>
        </div>

        {/* <div className="section pt-0">
          <h4 className="pb-5">Payment History</h4>

          {isArrayEmpty(paymentsData) && (
            <Empty
              className="mt-5 color-primary"
              icon="icon-card"
              desc="You have not made any payments"
            />
          )}

          <div className="relative">
            {loading && <Loader inline />}

            {!isArrayEmpty(paymentsData) && (
              <Table headers={PAYMENT_HEADERS}>
                {paymentsData.map((item, i) => (
                  <tr key={i}>
                    <td>{setTableIndex(currentPage, i)}</td>
                    <td>
                      {moment(item.updated_at).format(
                        `${PAYMENT_DATE_FORMAT}, hh:mm a`
                      )}
                    </td>
                    <td>{item.payment_details}</td>
                    <td>{formatPrice(item.amount)}</td>
                    <td>{getStatus(item.status)}</td>
                  </tr>
                ))}
              </Table>
            )}

            {!loading && paymentsDataCount > PAGE_SIZE && (
              <div className="section pb-0">
                <Pagination
                  className="pagination-bar"
                  currentPage={currentPage}
                  totalCount={paymentsDataCount}
                  pageSize={PAGE_SIZE}
                  onPageChange={(page) => handlePageChange(page)}
                />
              </div>
            )}
          </div>
        </div> */}
      </div>
    </section>
  );
}

export default withAuth(Payments);
