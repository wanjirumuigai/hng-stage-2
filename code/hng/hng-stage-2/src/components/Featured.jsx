import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import PlayCircleFilledWhiteOutlinedIcon from "@mui/icons-material/PlayCircleFilledWhiteOutlined";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import "./App.css";
import { useEffect, useState } from "react";
import Loading from "./Loading";

export default function Featured({ type }) {
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
    <div className="featured">
      <img src={featured.Image} alt="" />
      <div className="info">
        <h1>{featured.Title}</h1>
        <span className="desc">{featured.Plot}</span>
        <div className="buttons">
          <button className="play">
            <PlayCircleFilledWhiteOutlinedIcon />
            <span>Watch Trailer</span>
          </button>
          <button className="more">
            <InfoOutlinedIcon />
            <span>Info</span>
          </button>
        </div>
      </div>
    </div>
  );
}
