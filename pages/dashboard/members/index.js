import React, { useState } from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';
import { parseCookies } from 'nookies';
import withAuth from '../../../services/with-auth';
import axios from '../../../services/axios';
import useOnError from '../../../services/use-on-error';
import handleApiError from '../../../services/handle-api-error';

function Members({ members, error }) {
  // eslint-disable-next-line no-unused-vars
  const [membersData, setMembers] = useState(members);

  useOnError(error);

  return (
    <section>
      <Head>
        <title>Members | NBA-Ikeja</title>
      </Head>

      <div className="section"></div>
    </section>
  );
}

Members.propTypes = {
  members: PropTypes.array,
  error: PropTypes.object
};

export default withAuth(Members);

export async function getServerSideProps(ctx) {
  const cookies = parseCookies(ctx);

  const config = {
    headers: {
      Authorization: `Bearer ${cookies.token}`
    }
  };

  let members = null;
  let error = {};

  try {
    const { data } = await axios.get('/profiles', config);
    members = data;
  } catch (err) {
    error = handleApiError(err);
  } finally {
    return {
      props: {
        members,
        error
      }
    };
  }
}
