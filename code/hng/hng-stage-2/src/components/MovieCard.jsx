import React from "react";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

import Typography from "@mui/material/Typography";

import { useNavigate } from "react-router-dom";
import { Card } from "@mui/material";

const MovieInfo = ({ name, value }) => (
  <div className={`movie__${name}`}>
    <span className="info__head">
      {name.replace(/\b\w/g, (l) => l.toUpperCase())}
    </span>
    {value}
  </div>
);

const MovieCard = ({ movies, setMovies }) => {
  function handleView(id) {
    console.log("test");
  }
  return (
    <>
      {movies.map((movie) => {
        return (
          <div className="movie">
            <img src={movie.Poster} width={200} height={400} />

            <h2 className="movie__title">{movie.title}</h2>

            <span className="movie__description">{movie.description}</span>

            <div className="movie__infos">
              <p>{movie.Released}</p>
              <p>{movie.Title}</p>
            </div>

            <div className="movie__imdb">
              {/* <Rating rating={Math.round(movie.rating)} /> */}
              <a
                href={movie.imdbLink}
                className="movie__imdb-button"
                target="blank"
              >
                {" "}
                IMDb{" "}
              </a>
            </div>
          </div>
        );
      })}
      {/* {movies.map((movie) => {
        return (
          <Card
            key={movie.id}
            sx={{ maxWidth: 345 }}
            className="cardMedia"
            onClick={() => handleView(movie.id)}
          >
            <CardMedia
              sx={{ height: 140 }}
              image={movie.Image}
              title={movie.Title}
              key={movie.id}
            />

            <CardContent>
              <Typography gutterBottom variant="h6" component="div">
                {movie.Title}
              </Typography>

              <Typography variant="body2" color="text.secondary">
                {movie.Plot}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {movie.size} square feet
              </Typography>
            </CardContent>
          </Card>
        );
      })} */}
    </>
  );
};

export default MovieCard;
