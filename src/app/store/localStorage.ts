const setRatedMovie = (id: number, value: number) => {
  const ratedMovies = getRatedMovies();
  ratedMovies[id] = value;

  localStorage.setItem("ratedMovies", JSON.stringify(ratedMovies));
};

const getRatedMovies = () => {
  const item = localStorage.getItem("ratedMovies");

  return item ? JSON.parse(item) : {};
};

const getRatedMovie = (id: number) => {
  const retedMovies = getRatedMovies();
  return retedMovies[id];
}

const removeRatedMovie = (id: number) => {
  const ratedMovies = getRatedMovies();

  if (ratedMovies[id]) {
    delete ratedMovies[id];
    localStorage.setItem("ratedMovies", JSON.stringify(ratedMovies));
  }
};

export { setRatedMovie, getRatedMovies, getRatedMovie, removeRatedMovie };