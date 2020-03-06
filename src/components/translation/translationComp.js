import React from "react";
import { ReactComponent as ArrowSvg } from "../../images/btnTransArrow_crop.svg";
import "./translation.css";

function Translation(props) {
  function handleClick(e) {
    props.translate(e, ...buttonInfo[e.currentTarget.name]);
    const desc = `Move shape ${props.translationFactor} units ${e.currentTarget.name}`
    let para = buttonInfo[e.currentTarget.name]
    props.addToStack(ArrowSvg, desc, props.translate, para)
    console.log(desc)
  }

  const buttonInfo = {
    up: [0, -100],
    left: [-100, 0],
    right: [100, 0],
    down: [0, 100]
  };

  const buttons = [];
  for (let key in buttonInfo) {
    buttons.push(
      <button
        onClick={handleClick}
        key={key}
        name={key}
        alt={`${key} button`}
        id={key}
        className="arrow button"
      >
        <ArrowSvg />
      </button>
    );
  }

  return (
    <div id="translation" className="tab">
      <div className="controls">
        <input
          name="setTranslationFactor"
          type="number"
          min="0"
          max="18"
          onChange={props.handleChange}
          value={props.translationFactor}
          id="factorBox"
        />
        {buttons}
      </div>
    </div>
  );
}

export default Translation;
