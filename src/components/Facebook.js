import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import FacebookLogin from "react-facebook-login";

const Facebook = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  const responseFacebook = (response) => {
    console.log(response);
    if (response) {
      localStorage.setItem("token", response.accessToken);
      localStorage.setItem("user", response.userID);
      setLoggedIn(true);
    }
  };

  const componentClicked = () => console.log("clicked");

  let fbContent;
  fbContent = (
    <FacebookLogin
      appId="587806085193445"
      autoLoad={true}
      fields="name,email,picture"
      onClick={componentClicked}
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
