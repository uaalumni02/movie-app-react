import React, { useContext, useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import NavbarPage from "../components/navBar";
import settings from "../config/configData";
import { UserContext } from "../contexts/UserContext";
import { Button, Form, Row, Col } from "react-bootstrap";
import "../static/addMovie.css";

const Movie = () => {
  const [name, setName] = useState("");
  const [rating, setRatings] = useState([]);
  const [release, setRelease] = useState("");
  const [directors, setDirectors] = useState("");
  const [ratingId, setRatingId] = useState("");
  const [movieConfirmation, setMovieConfirmation] = useState(false);
  const { loggedIn } = useContext(UserContext);

  const fetchRatingData = () => {
    const token = localStorage.getItem("token");
    const bearer = "Bearer " + token;
    fetch(`${settings.apiBaseUrl}/api/rating/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: bearer,
      },
    })
      .then((res) => res.json())
      .then((response) => {
        setRatings(response.data);
      })
      .catch((error) => console.error("Error:", error));
  };

  useEffect(() => {
    fetchRatingData();
  }, []);

  const addMovie = (event) => {
    const token = localStorage.getItem("token");
    const bearer = "Bearer " + token;
    const userId = localStorage.getItem("user");
    event.preventDefault();
    fetch(`${settings.apiBaseUrl}/api/movie/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: bearer,
      },
      body: JSON.stringify({
        name,
        rating: ratingId,
        release,
        directors,
        userId,
      }),
    })
      .then((res) => res.json())
      .then((response) => {
        console.log(response)
        if (response.data) {
          setMovieConfirmation(true);
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
      <br></br>
      {movieConfirmation ? <Redirect to={`/allMovies/`} /> : ""}
      <Form>
        <Form.Group as={Row} controlId="formHorizontalName">
          <Form.Label column sm={2}>
            Name
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="name"
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formHorizontalDirectors">
          <Form.Label column sm={2}>
            Director(s)
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="directors"
              placeholder="Director(s)"
              onChange={(e) => setDirectors(e.target.value)}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="formHorizontalRelease">
          <Form.Label column sm={2}>
            Release Year
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="release"
              placeholder="Release Year"
              onChange={(e) => setRelease(e.target.value)}
            />
          </Col>
        </Form.Group>
        <fieldset>
          <Form.Group as={Row}>
            <Form.Label as="legend" column sm={2}>
              Rating
            </Form.Label>
            <Col sm={10}>
              {rating.map((ratings) => {
                return (
                  <Form.Check
                    key={ratings.id}
                    type="radio"
                    label={ratings.rating}
                    value={ratings.id}
                    name="rating"
                    id="formHorizontalRadios1"
                    onChange={(e) => setRatingId(e.target.value)}
                  />
                );
              })}
            </Col>
          </Form.Group>
        </fieldset>
        <Form.Group as={Row}>
          <Col sm={{ span: 10, offset: 2 }}>
            <Button onClick={addMovie} type="submit">
              Submit
            </Button>
          </Col>
        </Form.Group>
      </Form>
    </>
  );
};
export default Movie;
