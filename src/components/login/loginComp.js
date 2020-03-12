/* global gapi */
import React, { useState, useEffect } from "react";
import "./login.css";
import { keys } from "../../config.js";
import { postData, tokenInfo } from "../../scripts/fetch";


export default function Login(props) {
  const { setIsSignedIn, setUser, setCurrentLevel } = props;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameMsg, setUsernameMsg] = useState("");
  const [passwordMsg, setPasswordMsg] = useState("");
  const [accessToken, setAccessToken] = useState("");

  useEffect(() => {
    // timeout for known issue with firing too early
    const timer = setTimeout(() => {
      window.gapi.load("auth2", async () => {
        const auth2 = gapi.auth2.init({
          client_id: keys.clientId + ".apps.googleusercontent.com"
        });
        const gSignedIn = await auth2.isSignedIn.get()
        // setIsSignedIn(gSignedIn);
      });

      window.gapi.load("signin2", () => {
        const options = {
          client_id: keys.clientId + ".apps.googleusercontent.com",
          width: 300,
          height: 50,
          longtitle: true,
          onsuccess: handleSuccess,
          onfailure: handleFailure
        };
        gapi.signin2.render("gLoginBtn", options);
      });
    }, 10);
    return () => {
      clearTimeout(timer);
    };
  }, []);
  async function gAuthenticate(idToken) {
    // let response = await postData("tokensignin", "POST", {idToken: idToken});
    let response = await tokenInfo(idToken);
    const checkIssuer = (iss) => (
      iss === 'accounts.google.com' ||
      iss === 'https://accounts.google.com'
    )
    const checkAud = (aud) => (
      aud === (keys.clientId + ".apps.googleusercontent.com")
    )
    if (!checkIssuer(response.iss) || !checkAud(response.aud)) {
      console.log("Authentication failed.")
    } else {
      return response.sub; // Google ID
    }
  }
  async function startSession(idToken) {
    const gId = await gAuthenticate(idToken);
    // await postData("register", "POST", { gId: gId });
    // setAccessToken(await postData("auth", "POST", { gId: gId }));
    setUser({ gId: gId });
  }
  async function handleSuccess(googleUser) {
    const idToken = googleUser.getAuthResponse().id_token;
    await startSession(idToken);

    // const profile = googleUser.getBasicProfile();
    // const gId = profile.getId(); // Do not send to your backend! Use an ID token instead.
    // const name = profile.getGivenName();
    // const image = profile.getImageUrl();
    // const email = profile.getEmail(); // This is null if the 'email' scope is not present.
    setIsSignedIn(true); // must be last, component will unmount
  }
  function handleFailure() {
    setIsSignedIn(false);
  }
  function validateInputs(username, password) {
    let userValid =
      username.length >= 6 && username.length <= 16 && !username.includes(" ");
    let passValid =
      password.length >= 8 && password.length <= 128 && !password.includes(" ");
    if (!userValid) {
      setUsernameMsg("Must be 6-16 characters, with no spaces.");
    }
    if (!passValid) {
      setPasswordMsg("Must be 8 or more characters, with no spaces.");
    }
    return userValid && passValid;
  }
  async function handleLogin() {
    if (!validateInputs(username, password)) {
      return;
    }
    // const jsonUser = await postData("user/" + username, "GET");
    // if (jsonUser.message) {
    //   // not found
    //   await postData("register", "POST", {
    //     username: username,
    //     password: password
    //   });
    // } else {
    //   // found
    //   const jsonAuth = await postData("auth", "POST", {
    //     username: username,
    //     password: password
    //   });
    //   if (!jsonAuth.accessToken) {
    //     // wrong password
    //     setPasswordMsg("Wrong password.");
    //     setPassword("");
    //     return;
    //   }
    //   setAccessToken(jsonAuth.accessToken);
    // }
    // const currentLevel = jsonUser.username.currentLevel
    // setCurrentLevel(currentLevel? currentLevel: 1);
    setUser({ username: username });
    setIsSignedIn(true);
  }
  function handleGuest() {
    setUser({guest: "guest"+Date.now()})
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
          {`Username: ${usernameMsg}`}
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
          {`Password: ${passwordMsg}`}
        </label>
        <br />
        <input
          type="password"
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
