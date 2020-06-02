import React, { useContext, useReducer, useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import NavbarPage from "../components/navBar";
import settings from "../config/configData";
import { UserContext } from "../contexts/UserContext";
import reducer from "../reducer/reducer";
import initialState from "../store/store";
import { Button, Form, Row, Col } from "react-bootstrap";
import "../static/addMovie.css";

const Movie = () => {
  const [state, dispatch] = useReducer(reducer, initialState.addMovie);
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
        dispatch({
          field: "rating",
          value: response.data,
        });
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
        if (response.data) {
          dispatch({
            field: "movieConfirmation",
            value: true,
          });
        }
      })

      .catch((error) => console.error("Error:", error));
  };

  const onChange = (e) => {
    dispatch({
      field: e.target.name,
      value: e.target.value,
    });
  };

  const {
    name,
    rating,
    release,
    directors,
    ratingId,
    movieConfirmation,
  } = state;

  return (
    <>
      <div>{loggedIn ? <NavbarPage /> : ""}</div>
      {movieConfirmation ? <Redirect to={`/allMovies/`} /> : ""}
      <Form className="addMovie">
        <Form.Group as={Row} controlId="formHorizontalName">
          <Form.Label column sm={2}>
            Name
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              name="name"
              value={name}
              type="name"
              placeholder="Name"
              onChange={onChange}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formHorizontalDirectors">
          <Form.Label column sm={2}>
            Director(s)
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              name="directors"
              value={directors}
              type="directors"
              placeholder="Director(s)"
              onChange={onChange}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="formHorizontalRelease">
          <Form.Label column sm={2}>
            Release Year
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              name="release"
              value={release}
              type="release"
              placeholder="Release Year"
              onChange={onChange}
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
                    name="ratingId"
                    id="formHorizontalRadios1"
                    onChange={onChange}
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
