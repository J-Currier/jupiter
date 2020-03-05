import React from "react";
import rotate from "../../images/rotate-arrow.svg";
import "./rotation.css";

function Rotation(props) {
  const angles = [90, 180, 270];
  const options = [];
  for (const angle of angles) {
    options.push(<option key={angle}>{angle + "°"}</option>);
  }

  return (
    <div id="rotation" className="tab">
      <h1>Rotation</h1>
      <img 
        id="rotate-left" 
        alt="left rotation button" 
        src={rotate} 
        onClick={(e) => props.rotate(e, props.rotationMag, true)}
      ></img>
      <input
        type="number"
        name="setPivotPointx"
        value={props.pivotPointx}
        onChange={props.handleChange}
      ></input>
      <input
        type="number"
        name="setPivotPointy"
        value={props.pivotPointy}
        onChange={props.handleChange}
      ></input>
      <img id="rotate-right" 
      alt="right rotation button" 
      src={rotate}
      onClick={(e) => props.rotate(e, props.rotationMag, true)}
      ></img>

      <select id="rotateDrop" name="setRotationMag" value={props.rotationMag} onChange={props.handleChange}>{options}</select>
    </div>
  );
}

export default Rotation;
