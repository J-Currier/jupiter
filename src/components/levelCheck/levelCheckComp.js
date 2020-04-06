import React from "react";
import "./levelCheck.css";

export default function LevelCheck(props) {
  if (props.online) {
    props.postRun(
      props.callStackComps,
      props.attemptId,
      props.playerPositionsArray,
      props.playerAcceptablePositionsArray,
      props.score,
      true
    );
    props.endAttempt(props.attemptId);
  }
  function handleReset() {
    props.resetPlayer(
      props.userId,
      props.levelId,
      props.playerPositionsArray[0],
      props.targetPosition
    );
  }
  return (
    <div id="overlay" className="overlay">
      <div id="winner">
        <span>
          Portal Locked! <br />
          You Win
        </span>
        <button
          id="restartBtn"
          key="restart"
          name="restart"
          className="levelCheckBtn"
          onClick={handleReset}
        >
          Restart
        </button>
      </div>
    </div>
  );
}
