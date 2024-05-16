import IGenreResponse from '@/app/interfaces/IGenreResponse';
import IMovieResponse from '@/app/interfaces/IMovieResponse';


const getMovies = async (
  page: number,
  sorting: string
): Promise<IMovieResponse> => {
  const res = await fetch(
    `/api/proxy/discover/movie?page=${page}&sort_by=${sorting}`
  );

  return await res.json();
};

const getGenresList = async (): Promise<IGenreResponse> => {
  const res = await fetch(
    `/api/proxy/genre/movie/list`
  );
 
  return await res.json();
};

const getMovie = async (id: number) => {
  const res = await fetch(
    `/api/proxy/movie/${id}`
  );

  return await res.json();
};

export { getMovies, getGenresList, getMovie };
