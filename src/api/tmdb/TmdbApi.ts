import { GenreList, Movie, MovieList, VideoList } from "./types";

const getGenres = async (): Promise<GenreList> => {
  const res = await fetch(`/api/proxy/genre/movie/list`);

  return await res.json();
};

const getMovie = async (id: number): Promise<Movie> => {
  const res = await fetch(`/api/proxy/movie/${id}`);

  return await res.json();
};

const getMovies = async (page: number, sorting: string): Promise<MovieList> => {
  const res = await fetch(
    `/api/proxy/discover/movie?page=${page}&sort_by=${sorting}`
  );

  return await res.json();
};

const getVideos = async (id: number): Promise<VideoList> => {
  const res = await fetch(`/api/proxy/movie/${id}/videos`);

  return await res.json();
};

export { getMovies, getGenres, getMovie, getVideos };
