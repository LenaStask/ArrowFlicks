import { GenreList, Movie, MovieList, MovieListFilters } from "./types";

const getGenres = async (): Promise<GenreList> => {
  const res = await fetch(`/api/proxy/genre/movie/list`);

  return await res.json();
};

const getMovie = async (id: number): Promise<Movie> => {
  const res = await fetch(`/api/proxy/movie/${id}?append_to_response=videos`);

  return await res.json();
};

const getMovies = async (
  filters: MovieListFilters,
  sorting: string,
  page: number,
): Promise<MovieList> => {
  const searchParams = new URLSearchParams();

  if (filters.with_genres) {
    searchParams.append("with_genres", filters.with_genres);
  }
  if (filters.primary_release_year) {
    searchParams.append(
      "primary_release_year",
      filters.primary_release_year.toString(),
    );
  }
  if (filters["vote_average.gte"]) {
    searchParams.append("vote_average.gte", filters["vote_average.gte"]);
  }
  if (filters["vote_average.lte"]) {
    searchParams.append("vote_average.lte", filters["vote_average.lte"]);
  }
  searchParams.append("sort_by", sorting);
  searchParams.append("page", page.toString());

  const res = await fetch(
    `/api/proxy/discover/movie?${searchParams.toString()}`,
  );

  return await res.json();
};

export { getMovies, getGenres, getMovie };
