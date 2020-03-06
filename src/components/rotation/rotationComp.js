import React from "react";
import { ReactComponent as RotateCounterSvg } from "../../images/btnRotCounter.svg";
import "./rotation.css";

function Rotation(props) {
  const angles = [90, 180, 270];
  const options = [];
  for (const angle of angles) {
    options.push(<option key={angle}>{angle + "°"}</option>);
  }

  const handleClick = (
    e,
    rotationMag,
    pivotPointX,
    pivotPointY,
    counterClockwise
  ) => {
    props.rotate(e, rotationMag, pivotPointX, pivotPointY, counterClockwise);
    const desc = `Rotate the shape around point (${(pivotPointX,
    pivotPointY)})`;
    props.addToStack(RotateCounterSvg, desc, props.rotate, e);
  };

  return (
    <div id="rotation" className="tab">
      <div className="controls">
        <button
          id="rotate-left"
          key="rotate-left"
          name="rotate-left"
          className="controlBtn"
          onClick={e =>
            handleClick(
              e,
              props.rotationMag,
              props.pivotPointx,
              props.pivotPointy,
              true
            )
          }
        >
          <RotateCounterSvg alt="Counterclockwise Rotate Icon" />
        </button>
        <input
          id="setPivotPointx"
          key="setPivotPointx"
          className="controlInputNum"
          type="number"
          name="setPivotPointx"
          value={props.pivotPointx}
          onChange={props.handleChange}
        ></input>
        <input
          id="setPivotPointy"
          key="setPivotPointy"
          className="controlInputNum"
          type="number"
          name="setPivotPointy"
          value={props.pivotPointy}
          onChange={props.handleChange}
        ></input>
        <button
          id="rotate-right"
          key="rotate-right"
          name="rotate-right"
          className="controlBtn"
          onClick={e =>
            handleClick(
              e,
              props.rotationMag,
              props.pivotPointx,
              props.pivotPointy,
              false
            )
          }
        >
          <RotateCounterSvg alt="Counterclockwise Rotate Icon" />
        </button>

        <select
          id="rotateDrop"
          name="setRotationMag"
          value={props.rotationMag}
          onChange={props.handleChange}
        >
          {options}
        </select>
      </div>
    </div>
  );
}

export default Rotation;
