import axios from 'axios';

export default async function handler(req, res) {
  const timeOutDuration = 3000;
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ message: 'URL parameter is required' });
  }

  try {
    setTimeout(async () => {
      const response = await axios.get(url);
      res.status(response.status).json(response.data);
    }, timeOutDuration);
  } catch (error) {
    console.error(error);
    res.status(error.response.status).json({ message: 'An error occurred' });
  }
}
