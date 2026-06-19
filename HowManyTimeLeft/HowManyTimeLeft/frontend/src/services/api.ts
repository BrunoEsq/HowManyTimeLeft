import axios from 'axios';
import type { GamesSearchResponse, GameDetails } from '@/types/game';

const API_BASE_URL = import.meta.env.VITE_API_URL || '';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const searchGames = async (query: string, page = 1, pageSize = 20): Promise<GamesSearchResponse> => {
  const response = await apiClient.get<GamesSearchResponse>('/api/games/search/', {
    params: {
      search: query,
      page,
      page_size: pageSize,
    },
  });
  return response.data;
};

export const getGameDetails = async (gameId: number): Promise<GameDetails> => {
  const response = await apiClient.get<GameDetails>(`/api/games/${gameId}/`);
  return response.data;
};
