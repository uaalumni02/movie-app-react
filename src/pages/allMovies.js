import React, { useState, useEffect, useContext } from "react";
import settings from "../config/configData";
import { UserContext } from "../contexts/UserContext";
import NavbarPage from "../components/navBar";
import Accordion from "../components/Accordion";
import "../static/allMovies.css"
import { MDBCol } from "mdbreact";

const AllMovies = () => {
  const [movies, setMovies] = useState([]);
  const [rating, setRating] = useState("");
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

  const fetchRatingData = (movie) => {
    const token = localStorage.getItem("token");
    const bearer = "Bearer " + token;
    fetch(`${settings.apiBaseUrl}/api/rating/` + movie.rating, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: bearer,
      },
    })
      .then((res) => res.json())
      .then((response) => {
        setRating(response.data[0].rating);
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <>
      <div>{loggedIn ? <NavbarPage /> : ""}</div>
      <br></br>
      <br></br> <br></br>
      <br></br>
      <br></br>
      <MDBCol className="search" md="6">
        <form className="form-inline mt-4 mb-4">
          <input
            className="form-control form-control-sm ml-3 w-75"
            type="text"
            placeholder="Search"
            aria-label="Search"
            // onChange={handleInput}
          />
        </form>
      </MDBCol>
      <br></br>
      <br></br>
      {movies.map((movie) => (
        <Accordion
          key={movie.id}
          title={movie.name}
          release={movie.release}
          directors={movie.directors}
          rated={rating}
          onClick={() => {
            deleteMovie(movie);
          }}
          ratingId={() => {
            fetchRatingData(movie);
          }}
          edit={() => (window.location.href = `/editMovie/${movie.id}`)}
        />
      ))}
    </>
  );
};
export default AllMovies;
