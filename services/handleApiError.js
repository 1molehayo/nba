const handleApiError = (e) => {
  if (!e.response) {
    return {
      status: 404,
      message: 'No Internet Connection'
    };
  }

  if (e.response && e.response.data) {
    return {
      status: err.response.data.statusCode,
      message: `${err.response.data.message} API request`
    };
  }

  return {
    status: 500,
    message: 'There was a problem fetching data!'
  };
};

export default handleApiError;
