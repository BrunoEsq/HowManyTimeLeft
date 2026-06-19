import type { VercelRequest, VercelResponse } from '@vercel/node';

const RAWG_API_KEY = process.env.RAWG_API_KEY || '1b18eeed59504542baada61eb336bc78';
const RAWG_BASE_URL = 'https://api.rawg.io/api';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { id } = req.query;

    if (!id || typeof id !== 'string') {
      return res.status(400).json({ error: 'Game ID is required' });
    }

    const url = new URL(`${RAWG_BASE_URL}/games/${id}`);
    url.searchParams.set('key', RAWG_API_KEY);

    const response = await fetch(url.toString());

    if (!response.ok) {
      if (response.status === 404) {
        return res.status(404).json({ error: 'Game not found' });
      }
      throw new Error(`RAWG API error: ${response.status}`);
    }

    const data = await response.json();

    return res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching game details:', error);
    return res.status(500).json({
      error: 'Failed to fetch game details',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
