import React from "react";
import "./reflection.css";
import { ReactComponent as ReflectXSvg } from "../../images/btnReflectX.svg";
import { ReactComponent as ReflectYSvg } from "../../images/btnReflectY.svg";

function Reflection(props) {
  const selector = [];
  for (let i = 9; i >= -9; i--) {
    selector.push(<option key={i}>{i}</option>);
  }

  const handleClick = (e, lineOfReflection, axis, yAxis) => {
    props.reflect(e, lineOfReflection, axis);
    const desc = `Reflect the shape over the ${props.lineOfReflection} axis`;
    props.addToStack(yAxis ? ReflectYSvg : ReflectXSvg, desc, props.reflect, e);
  };

  return (
    <div id="reflection" className="tab">
      <div className="controls">
        <button
          id="reflectXBtn"
          key="reflectXBtn"
          name="reflectX"
          className="controlBtn"
          onClick={e => handleClick(e, props.lineOfReflection, false)}
        >
          <ReflectXSvg alt="X-reflection icon" />
        </button>
        <select
          id="reflectDrop"
          name="setLineOfReflection"
          value={props.lineOfReflection}
          className="controlSelect"
          onChange={props.handleChange}
        >
          {selector}
        </select>
        <button
          id="reflectYBtn"
          key="reflectYBtn"
          name="reflectY"
          className="controlBtn"
          onClick={e => props.reflect(e, props.lineOfReflection, true)}
        >
          <ReflectYSvg alt="Y-reflection icon" />
        </button>
      </div>
    </div>
  );
}

export default Reflection;
