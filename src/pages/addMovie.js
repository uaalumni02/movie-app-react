import React, { useContext, useState } from "react";
import { Redirect } from "react-router-dom";
import NavbarPage from "../components/navBar";
import settings from "../config/configData";
import { UserContext } from "../contexts/UserContext";
import { Button, Form, Row, Col } from "react-bootstrap";

const Movie = () => {
  const [name, setName] = useState("");
  const [rating, setRating] = useState("");
  const [release, setRelease] = useState("");
  const [directors, setDirectors] = useState("");
  const [movieConfirmation, setMovieConfirmation] = useState(false);
  const { loggedIn } = useContext(UserContext);

  const addMovie = (event) => {
    const token = localStorage.getItem("token");
    const bearer = "Bearer " + token;
    event.preventDefault();
    fetch(`${settings.apiBaseUrl}/api/movie/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: bearer,
      },
      body: JSON.stringify({
        name,
        rating,
        release,
        directors,
      }),
    })
      .then((res) => res.json())
      .then((response) => {
        console.log(response.data);
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
      {movieConfirmation ? <Redirect to={`/allMovies/`} /> : ""}
      <Form>
        <Form.Group as={Row} controlId="formHorizontalEmail">
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

        <Form.Group as={Row} controlId="formHorizontalPassword">
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
        <Form.Group as={Row} controlId="formHorizontalPassword">
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
              <Form.Check
                type="radio"
                label="G"
                value="G"
                name="rating"
                id="formHorizontalRadios1"
                onChange={(e) => setRating(e.target.value)}
              />
              <Form.Check
                type="radio"
                label="PG-13"
                value="PG-13"
                name="rating"
                id="formHorizontalRadios2"
                onChange={(e) => setRating(e.target.value)}
              />
              <Form.Check
                type="radio"
                label="R"
                value="R"
                name="rating"
                id="formHorizontalRadios3"
                onChange={(e) => setRating(e.target.value)}
              />
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