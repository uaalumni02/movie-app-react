import React, { useState, useEffect } from "react";
import settings from "../config/configData";

import { MDBListGroup, MDBListGroupItem, MDBContainer } from "mdbreact";

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
        // console.log(response.data)
        setMovies(response.data);
      })
      .catch((error) => console.error("Error:", error));
  };
  useEffect(() => {
    fetchMovieData();
  }, []);
  return (
    <MDBContainer>
      <center>
        <h1>All Movies</h1>
      </center>
      {movies.map((movie) => (
        <MDBListGroup
          className="col-md-4 mx-auto"
          style={{ width: "22rem" }}
          value={movie.id}
          key={movie.id}
        >
          <MDBListGroupItem style={{ marginBottom: "10px" }}>
            <div className="d-flex w-100 justify-content-between">
              <h5 className="mb-1">Title:  {movie.name}</h5>
            </div>
            <p className="mb-1">Rating:  {movie.rating}</p>
            <p className="mb-1">Release: {movie.release}</p>
            <p className="mb-1">Directors: {movie.directors}</p>
          </MDBListGroupItem>
        </MDBListGroup>
      ))}
    </MDBContainer>
  );
};
export default AllMovies;
