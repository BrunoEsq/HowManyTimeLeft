export interface Genre {
  id: number;
  name: string;
  slug: string;
}

export interface Platform {
  platform: {
    id: number;
    name: string;
    slug: string;
  };
}

export interface Developer {
  id: number;
  name: string;
  slug: string;
}

export interface Screenshot {
  id: number;
  image: string;
  width: number;
  height: number;
}

export interface EsrbRating {
  id: number;
  name: string;
  slug: string;
}

export interface Game {
  id: number;
  name: string;
  slug: string;
  background_image: string;
  rating: number;
  rating_top: number;
  ratings_count: number;
  released: string;
  genres: Genre[];
  platforms: Platform[];
  playtime: number;
  esrb_rating?: EsrbRating;
}

export interface GameDetails extends Game {
  description_raw: string;
  description: string;
  metacritic: number | null;
  metacritic_platforms: any[];
  developers: Developer[];
  publishers: Developer[];
  screenshots?: Screenshot[];
  tags: Genre[];
  website: string;
  updated: string;
}

export interface GamesSearchResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Game[];
}
