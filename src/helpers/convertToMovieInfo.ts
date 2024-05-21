import { Genre, MovieListItem } from "@/api/tmdb/types";
import MovieInfo from "@/types/MovieInfo";

export default function convertToMovieInfo(
  movieListItems: MovieListItem[],
  genres: Genre[]
): MovieInfo[] {
  return movieListItems.map((movieListItem) => {
    return {
      genres: genres.filter((genre) =>
        movieListItem.genre_ids.includes(genre.id)
      ),
      id: movieListItem.id,
      original_title: movieListItem.original_title,
      poster_path: movieListItem.poster_path,
      release_date: movieListItem.release_date,
      vote_average: movieListItem.vote_average,
      vote_count: movieListItem.vote_count,
    };
  });
}
