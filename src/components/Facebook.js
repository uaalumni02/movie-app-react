import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import settings from "../config/configData";
import FacebookLogin from "react-facebook-login";

const Facebook = () => {
  const [username, setUsername] = useState("");
  const [password] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);

  const responseFacebook = (response) => {
    // console.log(response)
    fetch(`${settings.apiBaseUrl}/api/fbuser/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: response.email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((response) => {
        setUsername(response.email);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", response.data.id);
        setLoggedIn(true);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  let fbContent;
  fbContent = (
    <FacebookLogin
      appId="587806085193445"
      autoLoad={true}
      fields="name,email,picture"
      callback={responseFacebook}
    />
  );
  return (
    <>
      {fbContent}
      {loggedIn ? <Redirect to="/allMovies/" /> : ""}
    </>
  );
};

export default Facebook;
