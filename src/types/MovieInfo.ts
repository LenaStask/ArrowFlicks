import { Genre } from '@/api/tmdb/types';

export default interface MovieInfo {
  genres: Genre[];
  id: number;
  original_title: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
}