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
    const { search, page = 1, page_size = 20 } = req.query;

    if (!search || typeof search !== 'string') {
      return res.status(400).json({ error: 'Search query is required' });
    }

    const url = new URL(`${RAWG_BASE_URL}/games`);
    url.searchParams.set('key', RAWG_API_KEY);
    url.searchParams.set('search', search);
    url.searchParams.set('page', String(page));
    url.searchParams.set('page_size', String(page_size));

    const response = await fetch(url.toString());

    if (!response.ok) {
      throw new Error(`RAWG API error: ${response.status}`);
    }

    const data = await response.json();

    return res.status(200).json({
      count: data.count,
      next: data.next,
      previous: data.previous,
      results: data.results,
    });
  } catch (error) {
    console.error('Error fetching games:', error);
    return res.status(500).json({
      error: 'Failed to fetch games',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
