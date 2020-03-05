import React from "react";
import "./reflection.css";
import { ReactComponent as ReflectYSvg } from '../../images/btnReflectY.svg'
import { ReactComponent as ReflectXSvg } from '../../images/btnReflectX.svg'

function Reflection(props) {
  const selector = [];
  for (let i = -9; i < 10; i++) {
    selector.push(<option key={i}>{i}</option>);
  };

  function handleClick(e) {
    const axes = {
      reflectX: [true, false, props.lineOfReflection],
      reflectY: [false, true, props.lineOfReflection],
    }
    props.reflect(e, axes[e.currentTarget.name]);
  }

  return (
    <div id="reflection" className="tab">
      <div className="controls">
        <button
          id="reflectXBtn"
          name="reflectX" 
          className="controlBtn"
          onClick={handleClick}
        >
          <ReflectXSvg />
        </button>
        <select
          id="reflectDrop"
          name="setLineOfReflection"
          value={props.lineOfReflection}
          onChange={props.handleChange}
        >
          {selector}
        </select>
        <button
          id="reflectYBtn"
          name="reflectY"
          className="controlBtn"
          onClick={handleClick}
        >
          <ReflectYSvg />
        </button>
      </div>
    </div>
  );
}

export default Reflection;
