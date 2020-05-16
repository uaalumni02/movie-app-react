import React, { useState, useEffect, useRef } from "react";
import settings from "../config/configData";
import NavbarPage from "../components/navBar";
import Accordion from "../components/Accordion";

const AllMovies = () => {
  const [movies, setMovies] = useState([]);

  const fetchMovieData = () => {
    const token = localStorage.getItem("token");
    const bearer = "Bearer " + token;
    const userId = localStorage.getItem("user");
    fetch(`${settings.apiBaseUrl}/api/movieUser/` + userId, {
      method: "GET",
      headers: {
        Authorization: bearer,
      },
    })
      .then((res) => res.json())
      .then((response) => {
        setMovies(response.data);
      })
      .catch((error) => console.error("Error:", error));
  };
  useEffect(() => {
    fetchMovieData();
  }, []);

  return (
    <div>
      {movies.map((movie) => (
        <Accordion
          title={movie.name}
          release={movie.release}
          directors={movie.directors}
          rated={movie.rating}
        />
      ))}
    </div>
  );
};
export default AllMovies;
