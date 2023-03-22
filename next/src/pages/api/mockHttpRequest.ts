import { NextApiRequest, NextApiResponse } from 'next';
import axios, { AxiosError } from 'axios';

/**
 * Proxy for testing.
 *
 * @param req
 * @param res
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const timeOutDuration: number = 3000;
  const { status } = req.query;

  if (!status) {
    return res.status(400).json({ message: 'Status parameter is required' });
  }

  try {
    setTimeout(async () => {
      if (typeof status === 'string') {
        const response = await axios.get(`https://mock.codes/${status}`);
        res.status(response.status).json(response.data);
      }
    }, timeOutDuration);
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      console.error(error);
      res.status(error.response.status).json({ message: 'An error occurred' });
    }
  }
}
