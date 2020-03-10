/* global gapi */
import React, { useState } from "react";
import "./login.css";
import { ReactComponent as MenuSvg } from "../..//images/Icon_menu.svg";

export default function Menu(props) {
  const [menuOpen, setMenuOpen] = useState(false);

  async function handleSignOut() {
    const auth2 = await gapi.auth2.getAuthInstance();
    await auth2.signOut();
    props.setIsSignedIn(false);
  }
  const buttonInfo = {
    highScoresBtn: { handleClick: props.handleHighScores, text: "High Scores" },
    restartBtn: { handleClick: props.handleRestart, text: "Restart Level" },
    logoutBtn: { handleClick: handleSignOut, text: "Sign Out" }
  };
  const buttons = [];
  for (let key in buttonInfo) {
    buttons.push(
      <button
        onClick={buttonInfo[key].handleClick}
        key={key}
        name={key}
        alt={key}
        id={key}
        className="navBtn"
      >
        {buttonInfo[key].text}
      </button>
    );
  }
  function handleMenu() {
    setMenuOpen(previous => !previous);
  }
  return (
    <div id="menu">
      <button
        id="menuBtn"
        name="menuBtn"
        key="menuBtn"
        onClick={handleMenu}
        className={menuOpen ? "open" : "closed"}
      >
        <MenuSvg alt="menu" tabIndex="0" />
      </button>
      <div
        id="menuOverlay"
        className={menuOpen ? "overlay" : "none"}
        onClick={handleMenu}
      ></div>
      <nav id="menuNav" className={menuOpen ? "open" : "closed"}>
        {buttons}
      </nav>
    </div>
  );
}
