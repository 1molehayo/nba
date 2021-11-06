import PropTypes from 'prop-types';

function Error({ statusCode }) {
  return (
    <section className="section error-page">
      <h1>{statusCode}</h1>

      <p>
        {statusCode
          ? `An error ${statusCode} occurred on server`
          : 'An error occurred on client'}
      </p>
    </section>
  );
}

Error.propTypes = {
  statusCode: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

Error.getInitialProps = ({ res, err }) => {
  let statusCode = 404;

  if (res && res.statusCode) {
    statusCode = res.statusCode;
  }

  if (err && err.statusCode) {
    statusCode = err.statusCode;
  }

  return { statusCode };
};

export default Error;
