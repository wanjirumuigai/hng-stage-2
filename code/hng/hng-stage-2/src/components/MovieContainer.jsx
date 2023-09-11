import React from "react";

import "./App.css";
import MovieCard from "./MovieCard";

function MovieContainer({ movies, setMovies }) {
  return (
    <ul className="cards">
      <MovieCard movies={movies} setMovies={setMovies} />
    </ul>
  );
}
export default MovieContainer;
