/* global gapi */
import React, { useState, useEffect, useRef } from "react";
import "./login.css";
import { keys } from "../../config.js";

export default function Login(props) {
  const { setIsSignedIn, setUser } = props;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const auth2 = useRef();
  useEffect(() => {
    window.gapi.load("auth2", async () => {
      auth2.current = gapi.auth2.init({
        client_id: keys.clientId + ".apps.googleusercontent.com"
      });
      auth2.current.attachClickHandler(
        "gLoginBtn",
        {},
        handleSuccess,
        handleFailure
      );
      setIsSignedIn(await auth2.current.isSignedIn.get());
    });

    window.gapi.load("signin2", () => {
      const options = {
        width: 300,
        height: 50,
        longtitle: true,
        onsuccess: handleSuccess,
        onfailure: handleFailure
      };
      gapi.signin2.render("gLoginBtn", options);
    });
  }, []);

  function handleSuccess(googleUser) {
    setIsSignedIn(true);
    const profile = googleUser.getBasicProfile();
    const id = profile.getId(); // Do not send to your backend! Use an ID token instead.
    const name = profile.getGivenName();
    const image = profile.getImageUrl();
    const email = profile.getEmail(); // This is null if the 'email' scope is not present.
    const id_token = googleUser.getAuthResponse().id_token;
    setUser({
      id_token: id_token,
      id: id,
      name: name,
      image: image,
      email: email
    });
  }
  function handleFailure() {
    setIsSignedIn(false);
  }
  function handleLogin() {
    setIsSignedIn(true);
  }
  function handleGuest() {
    setIsSignedIn(true);
  }
  function handleUsername(e) {
    setUsername(e.target.value);
  }
  function handlePassword(e) {
    setPassword(e.target.value);
  }
  return (
    <div id="login" className="overlay">
      <div className="loginItem">
        <label htmlFor="username" className="loginLabel">
          Username:
        </label>
        <br />
        <input
          type="text"
          autoComplete="username"
          id="username"
          name="username"
          key="username"
          className="loginInput"
          value={username}
          onChange={handleUsername}
        ></input>
      </div>
      <div className="loginItem">
        <label htmlFor="password" className="loginLabel">
          ID number:
        </label>
        <br />
        <input
          type="text"
          autoComplete="current-password"
          id="password"
          name="password"
          key="password"
          className="loginInput"
          value={password}
          onChange={handlePassword}
        ></input>
      </div>
      <button
        id="loginBtn"
        className="loginBtn"
        key="loginBtn"
        onClick={handleLogin}
      >
        Sign in
      </button>
      <button
        id="guestBtn"
        className="loginBtn"
        key="guestBtn"
        onClick={handleGuest}
      >
        Play as a Guest
      </button>
      <button id="gLoginBtn">Sign in with Google</button>
      )}
    </div>
  );
}
