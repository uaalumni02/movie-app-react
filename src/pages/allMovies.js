import React, { useState, useEffect, useContext } from "react";
import settings from "../config/configData";
import { UserContext } from "../contexts/UserContext";
import NavbarPage from "../components/navBar";
import Accordion from "../components/Accordion";

const AllMovies = () => {
  const [movies, setMovies] = useState([]);
  const { loggedIn } = useContext(UserContext);

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

  const deleteMovie = (movie) => {
    const token = localStorage.getItem("token");
    const bearer = "Bearer " + token;
    fetch(`${settings.apiBaseUrl}/api/movie/` + movie.id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: bearer,
      },
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.success) {
          fetchMovieData();
        }
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <>
      <div>{loggedIn ? <NavbarPage /> : ""}</div>
      <br></br>
      <br></br> <br></br>
      <br></br>
      {movies.map((movie) => (
        <Accordion
          key={movie.id}
          title={movie.name}
          release={movie.release}
          directors={movie.directors}
          rated={movie.rating}
          onClick={() => {
            deleteMovie(movie);
          }}
        />
      ))}
    </>
  );
};
export default AllMovies;
