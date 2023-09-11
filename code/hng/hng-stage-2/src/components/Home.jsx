import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import Loading from "./Loading";
import { Link } from "react-router-dom";

import "./App.css";
import MovieContainer from "./MovieContainer";
import Featured from "./Featured";

const Home = () => {
  const [featured, setFeatured] = useState([]);
  const [movies, setMovies] = useState([]);

  const url = "http://localhost:3000";

  useEffect(() => {
    fetch("http://localhost:3000/films/1")
      .then((res) => res.json())
      .then((data) => {
        setFeatured(data);
      });
  }, []);

  useEffect(() => {
    fetch(`${url}/films`)
      .then((res) => res.json())
      .then((data) => {
        setMovies(data);
      });
  }, []);

  if (!featured) {
    <Loading />;
  }

  return (
    <div>
      <Featured />
      <MovieContainer movies={movies} setMovies={setMovies} />
    </div>
  );
};

export default Home;
