import React from "react";
import "./reflection.css";
import { ReactComponent as ReflectXSvg } from "../../images/btnReflectX.svg";
import { ReactComponent as ReflectYSvg } from "../../images/btnReflectY.svg";

function Reflection(props) {
  const selector = [];
  for (let i = -9; i < 10; i++) {
    selector.push(<option key={i}>{i}</option>);
  }

  const handleClick = (e, lineOfReflection, axis, xAxis) => {
    props.reflect(e, lineOfReflection, axis);
    const desc = `Reflect the shape over the axis on ${lineOfReflection}${xAxis ? 'X': 'Y'}`;
    props.addToStack(
      xAxis ? ReflectXSvg : ReflectYSvg, 
      desc, 
      props.reflect, 
      e
    );
  };

  return (
    <div className="tab">
      <div className="controls">
        <button
          id="reflectXBtn"
          key="reflectXBtn"
          name="reflectX"
          className="controlBtn"
          onClick={e => handleClick(e, props.lineOfReflection, true)}
        >
          <ReflectXSvg 
            alt="X-reflection icon"
          />
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
          key="reflectYBtn"
          name="reflectY"
          className="controlBtn"
          onClick={e => handleClick(e, props.lineOfReflection, false)}
        >
          <ReflectYSvg 
            alt="Y-reflection icon"
          />
        </button>
      </div>
    </div>
  );
}

export default Reflection;
