/* global gapi */
import React, { useState, useEffect } from "react";
import "./login.css";
import { ReactComponent as MenuSvg } from "../..//images/Icon_menu.svg";
import { fetchJson } from "../../scripts/fetch";


function countMatchingObjects(array, compareKey, matchValue) {
  let count = 0;
  for (const v of array) {
    if (v[compareKey] === matchValue) {
      count++;
    }
  }
  return count;
}

async function getScore() {
  const attemptsJson = await fetchJson("Attempts", "GET");
  let runsJson = [];
  try {
    runsJson = await fetchJson("FunctionsRuns", "GET");
  } catch(e) {
    console.log(e);
  }
  const scores = attemptsJson.map(v => {
    const score = 100 - 10 * countMatchingObjects(runsJson, "AttemptId", v.id);
    return {playerId: v.playerId, levelId: v.levelId, score: score}
  });
  scores.sort((a, b) => Number(b.score) - Number(a.score));
  // scores.sort((a, b) => Number(b.levelId) - Number(a.levelId));
  return scores;
}

export default function Menu(props) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scoreOpen, setScoreOpen] = useState(false);
  // const [overlay, setOverlay] = useState(false);
  const [scoreDisplay, setScoreDisplay] = useState(null);

  function handleMenu() {
    setMenuOpen(previous => !previous);
    if (scoreOpen) {
      setScoreOpen(false);
    }
  }
  function handleOverlay() {
    setMenuOpen(false);
    setScoreOpen(false);
  }
  async function scoreTable() {
    const scores = await getScore();
    const scoreRows = scores.slice(0,5).map((v,i) => (
      <tr key={i} className={v.playerId===props.user.id?"player":""}>
        <td key="level">{v.levelId}</td>
        <td key="runs">{v.score}</td>
      </tr>
    ));
    return (<table id="highScore">
      <thead>
        <tr key="head">
          <th>Level</th>
          <th>Score</th>
        </tr>
      </thead>
      <tbody>
        {scoreRows}
      </tbody>
    </table>);
  } 

  async function handleClickHighScores() {
    if (props.online) {
      setScoreDisplay(await scoreTable());
    } else {
      setScoreDisplay(<p id="noScore">Scores are temporarily unavailable.</p>);
    }
    setScoreOpen(prev => !prev);
    setMenuOpen(prev => !prev);
  }
  function handleClickRestart() {
    props.handleRestart();
    setMenuOpen(false);
  }
  async function handleClickSignOut() {
    const auth2 = await gapi.auth2.getAuthInstance();
    await auth2.signOut();
    setMenuOpen(false);
    props.setUser(null);
    setTimeout(() => {
      props.setIsSignedIn(false) // unmount
    }, 400);
  }
  const buttonInfo = {
    highScoresBtn: { handleClick: handleClickHighScores, text: "High Scores" },
    restartBtn: { handleClick: handleClickRestart, text: "Restart Level" },
    logoutBtn: { handleClick: handleClickSignOut, text: "Sign Out" }
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

  return (
    <div id="menu">
      <button
        id="menuBtn"
        name="menuBtn"
        key="menuBtn"
        onClick={handleMenu}
        className={menuOpen || scoreOpen ? "open" : "closed"}
      >
        <MenuSvg alt="menu" tabIndex="0" />
      </button>
      {(menuOpen || scoreOpen) &&
        <div id="menuOverlay" className="overlay" onClick={handleOverlay}></div>
      }
      <nav id="menuNav" className={menuOpen ? "open" : "closed"}>
        {buttons}
      </nav>
      <div id="scoreTab" className={scoreOpen ? "open" : "closed"}>
        {scoreDisplay}
      </div>
      }
    </div>
  );
}
