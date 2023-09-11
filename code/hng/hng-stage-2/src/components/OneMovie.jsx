import React, { useEffect, useState } from "react";
import { Button, Spoiler } from "@mantine/core";

const OneMovie = () => {
  const [movie, setMovies] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const url = "http://localhost:3000";

  useEffect(() => {
    fetch(`${url}/films/1`)
      .then((res) => res.json())
      .then((data) => {
        setMovies(data);

        setIsLoaded(true);
      });
  }, []);

  if (!isLoaded)
    return (
      <>
        <h3>Loading ...</h3>
        <div className="loader">
          <span id="span"></span>
          <span id="span"></span>
          <span id="span"></span>
          <span id="span"></span>
        </div>
      </>
    );

  return (
    <main className="text-black relative lg:w-5/6 lg:mx-auto">
      {/* <div className="bg-gray-900 h-0"></div> */}
      <section className="min-h-full bg-white lg:flex lg:mx-auto lg:gap-16">
        <main className="relative pt-5 lg:pt-0 lg:w-3/5 lg:flex lg:flex-col lg:shadow-lg shadow-gray-900 lg:mt-16">
          <div className=" flex items-center">
            <img
              src={movie.Poster}
              alt="Film Poster"
              className="w-full h-[300px] object-contain border-2 shadow-md lg:h-[486px] rounded-wsm mx-auto lg:w-full"
              height={400}
              width={1147}
            />
          </div>
          <div className="text-xs pt-5 w-11/12 mx-auto lg:w-full">
            <div className="flex my-0 justify-between lg:my-auto text-sm flex md:items-center md:flex md:justify-between lg:justify-between">
              <h3 className="hidden md:flex lg:flex lg:text-2xl px-1 font-bold uppercase">
                {movie.Title}
              </h3>
              <div className="flex my-auto grow space-x-2 sm:space-x-2 flex-wrap md:flex-nowrap lg:flex-nowrap lg:grow-0 md:grow-0 justify-between sm:justify-normal sm:space-x-2 lg:my-auto text-sm flex items-center lg:space-x-2">
                <Button className="px-2 justify-center text-xs py-1 my-3 translate-y-200 text-sm flex transition-all duration-150 h-full text-black bg-white border-2 hover:bg-white border-white font-semibold hover:font-bold rounded-2xl">
                  Share Movie
                </Button>

                <Button className="px-2 justify-center py-1 m-2 my-3 text-xs flex text-sm transition-all duration-150 bg-yellow-200/10 h-full hover:bg-yellow-300/40 border hover:text-black border-yellow-500 font-semibold rounded-2xl">
                  Watch Trailer
                </Button>
                <Button className="px-2 justify-center py-1 my-3 text-xs text-sm flex transition-all duration-150 h-full hover:bg-transparent border-2 border-white font-semibold text-sm hover:font-bold rounded-2xl">
                  Download
                </Button>
                <Button className="px-2 justify-center py-1 my-3 text-xs text-sm flex transition-all duration-150 h-full hover:bg-transparent border-2 border-white font-semibold hover:font-bold rounded-2xl">
                  Cast
                </Button>
                {/* <Button onClick={handleClick} ref={ref} id='tty' style={{transform: isHover? "scale(1.02) translateZ(0px)":"none"}} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>rrrrrr</Button> */}
              </div>
            </div>
            <div className="">
              <div className="mt-1 flex items-center">
                <span className="text-xs py-0.5 shadow mr-2 inline-flex items-center font-semibold rounded-full lg:rounded-md">
                  <span className="inline-block mt-0.5 lg:mt-0">
                    {movie.Year}
                  </span>
                </span>
                <span className="text-xs py-0.5 shadow mr-2 inline-flex items-center font-semibold rounded-full lg:rounded-md">
                  <span className="inline-block mt-0.5 lg:mt-0">
                    {movie.Rated}
                  </span>
                </span>
                <span className="text-xs py-0.5 shadow mr-2 inline-flex items-center font-semibold rounded-full lg:rounded-md">
                  <span className="inline-block mt-0.5 lg:mt-0">
                    {movie.Runtime}
                  </span>
                </span>
                <div></div>
              </div>
              <Spoiler
                maxHeight={0}
                showLabel="Show Cast & Crew"
                hideLabel="Hide"
              >
                {movie.Actors}
              </Spoiler>
            </div>

            <div className="mt-2 text-sm lg:w-full">
              <Spoiler
                maxHeight={40}
                showLabel="Show more"
                hideLabel="Hide"
                className="lg:w-full"
              >
                {movie.Plot}
              </Spoiler>
            </div>
          </div>
        </main>
      </section>
    </main>
  );
};

export default OneMovie;
