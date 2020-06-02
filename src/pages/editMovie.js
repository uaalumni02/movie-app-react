import React, { useContext, useState, useReducer, useEffect } from "react";
import { Redirect } from "react-router-dom";
import NavbarPage from "../components/navBar";
import settings from "../config/configData";
import { UserContext } from "../contexts/UserContext";
import reducer from "../reducer/reducer";
import initialState from "../store/store";
import "../static/editMovie.css";
import { Button, Form, Row, Col } from "react-bootstrap";

const EditMovie = () => {
  const [rating, setRating] = useState("");
  const [state, dispatch] = useReducer(reducer, initialState.editMovie);
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
          field: "ratingData",
          value: response.data,
        });
      })
      .catch((error) => console.error("Error:", error));
  };

  useEffect(() => {
    fetchRatingData();
    fetchMovieData();
  }, []);

  const fetchMovieData = () => {
    const token = localStorage.getItem("token");
    const bearer = "Bearer " + token;
    const url = window.location.pathname;
    const id = url.substring(url.lastIndexOf("/") + 1);
    fetch(`${settings.apiBaseUrl}/api/movie/` + id, {
      method: "GET",
      headers: {
        Authorization: bearer,
      },
    })
      .then((res) => res.json())
      .then((response) => {
        setRating(response.data[0].rating);
        dispatch({
          field: "name",
          value: response.data[0].name,
        });
        // dispatch({
        //   field: "rating",
        //   value: response.data[0].rating,
        // });
        dispatch({
          field: "release",
          value: response.data[0].release,
        });
        dispatch({
          field: "directors",
          value: response.data[0].directors,
        });
      })
      .catch((error) => console.error("Error:", error));
  };

  const updateMovie = (event) => {
    event.preventDefault();
    const token = localStorage.getItem("token");
    const bearer = "Bearer " + token;
    const url = window.location.pathname;
    const id = url.substring(url.lastIndexOf("/") + 1);
    fetch(`${settings.apiBaseUrl}/api/movie/` + id, {
      method: "PATCH",
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
        if (response.success === true) {
          dispatch({
            field: "movieConfirmation",
            value: true,
          });
        }
      })
      .catch((error) => console.error("Error:", error));
  };

  const {
    name,
    // rating,
    release,
    directors,
    ratingData,
    movieConfirmation,
  } = state;

  const onChange = (e) => {
    dispatch({
      field: e.target.name,
      value: e.target.value,
    });
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
              name="name"
              value={name}
              type="name"
              placeholder="Name"
              value={name}
              onChange={onChange}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="formHorizontalPassword">
          <Form.Label column sm={2}>
            Director(s)
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              name="directors"
              value={directors}
              type="directors"
              placeholder="Director(s)"
              value={directors}
              onChange={onChange}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="formHorizontalPassword">
          <Form.Label column sm={2}>
            Release Year
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              name="release"
              value={release}
              type="release"
              placeholder="Release Year"
              value={release}
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
              {ratingData.map((ratings) => {
                const checked = rating === ratings.id;
                return (
                  <Form.Check
                    type="radio"
                    key={ratings.id}
                    label={ratings.rating}
                    value={ratings.id}
                    name="rating"
                    id="formHorizontalRadios1"
                    checked={checked}
                    onChange={(e) => setRating(e.target.value)}
                  />
                );
              })}
            </Col>
          </Form.Group>
        </fieldset>{" "}
        <Form.Group as={Row}>
          <Col sm={{ span: 10, offset: 2 }}>
            <Button type="submit" onClick={updateMovie}>
              Submit
            </Button>
          </Col>
        </Form.Group>
      </Form>
    </>
  );
};

export default EditMovie;
