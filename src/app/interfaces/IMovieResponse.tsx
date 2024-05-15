import IMovieListItem from "./IMovieListItem";

export default interface IMovieResponse {
  page: number;
  results: IMovieListItem[];
  total_pages: number;
  total_results: number;
}
