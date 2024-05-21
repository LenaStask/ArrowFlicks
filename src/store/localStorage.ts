import RatedMovie from '@/types/RatedMovie';

const getRatedMovies = (): RatedMovie[] => {
  const item = localStorage.getItem("ratedMovies");

  return item ? JSON.parse(item) : [];
};

const getRatedMovie = (id: number): RatedMovie | null => {
  const ratedMovies = getRatedMovies();
  const foundMovies = ratedMovies.filter((movie) => movie.id === id);

  return foundMovies.length !== 0 ? foundMovies[0] : null;
};

const setRatedMovie = (id: number, value: number) => {
  const ratedMovies = getRatedMovies();
  ratedMovies.push({id: id, rating: value});

  localStorage.setItem("ratedMovies", JSON.stringify(ratedMovies));
};

const removeRatedMovie = (id: number) => {
  let ratedMovies = getRatedMovies();

  ratedMovies = ratedMovies.filter((movie) => movie.id !== id)

  localStorage.setItem("ratedMovies", JSON.stringify(ratedMovies));
};

export { setRatedMovie, getRatedMovies, getRatedMovie, removeRatedMovie };