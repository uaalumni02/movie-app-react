import React, { useReducer } from "react";
import settings from "../config/configData";
import { Redirect } from "react-router-dom";
import reducer from "../reducer/reducer";
import initialState from "../store/store";
import "../static/login.css";
import Facebook from "../components/Facebook";

import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBBtn,
  MDBModalFooter,
} from "mdbreact";

const Login = () => {
  const [state, dispatch] = useReducer(reducer, initialState.login);
  const handleSubmit = (event) => {
    event.preventDefault();
    fetch(`${settings.apiBaseUrl}/api/user/login`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    })
      .then((res) => res.json())
      .then((response) => {
        if (
          response.success === false ||
          response.data.user.role === "standard"
        ) {
          dispatch({
            field: "InvalidLogin",
            value: "Invalid username, password or pending approval",
          });
        } else {
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("user", response.data.user[0].id);
          dispatch({
            field: "loggedIn",
            value: true,
          });
        }
      })
      .catch((error) => console.error("Error:", error));
  };

  const onChange = (e) => {
    dispatch({
      field: e.target.name,
      value: e.target.value.toLowerCase().trim(),
    });
  };

  const { username, password, InvalidLogin, loggedIn } = state;

  return (
    <MDBContainer>
      {loggedIn ? <Redirect to="/allMovies/" /> : ""}
      <MDBRow>
        <MDBCol md="5" className="col-md-4 mx-auto">
          <MDBCard className="loginCard">
            <MDBCardBody className="mx-4">
              <div className="text-center">
                <h3 className="dark-grey-text mb-5">
                  <strong>Sign in</strong>
                </h3>
              </div>
              <MDBInput
                label="Your username"
                name="username"
                value={username}
                onChange={onChange}
                group
                type="email"
                validate
                error="wrong"
                success="right"
              />
              <MDBInput
                label="Your password"
                name="password"
                value={password}
                onChange={onChange}
                group
                type="password"
                validate
                containerClass="mb-0"
              />
              <p className="font-small blue-text d-flex justify-content-end pb-3">
                Forgot
                <a href="#!" className="blue-text ml-1">
                  Password?
                </a>
              </p>
              <div className="text-center mb-3">
                <p>{InvalidLogin}</p>
                <MDBBtn
                  type="submit"
                  gradient="blue"
                  rounded
                  className="btn-block z-depth-1a"
                  onClick={handleSubmit}
                >
                  Sign in
                </MDBBtn>
              </div>
              <p className="font-small dark-grey-text text-right d-flex justify-content-center mb-3 pt-2">
                or Sign in with:
              </p>
              <div className="row my-3 d-flex justify-content-center">
                <Facebook />
              </div>
            </MDBCardBody>
            <MDBModalFooter className="mx-5 pt-3 mb-1">
              <p className="font-small grey-text d-flex justify-content-end">
                Not a member?
                <a href="/register" className="blue-text ml-1">
                  Sign Up
                </a>
              </p>
            </MDBModalFooter>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default Login;
