import axios from 'axios';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

async function handler(req, res) {
  // await runMiddleware(req, res, cors);

  try {
    const { data } = await axios.get(
      'https://jsonplaceholder.typicode.com/todos/1'
    );

    res.status(200).json(data);
  } catch (error) {
    const { data } = error.response || {};

    return res.status(500).json(data);
  }
}

export default handler;
