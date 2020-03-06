import React from "react";
import "./reflection.css";
// import rotate from "../../images/rotate-arrow.svg";
// import reflectY from '../../images/btnReflectY.svg'
import { ReactComponent as rotate } from "../../images/btnTransArrow_crop.svg";


function Reflection(props) {
  const selector = () => {
    const array = [];
    for (let i = -9; i < 10; i++) {
      array.push(<option key={i}>{i}</option>);
    }
    return array;
  };

  const handleClick = (e, lineOfReflection, axis) => {
    props.reflect(e, lineOfReflection, axis);
    const desc = `Reflect the shape over the ${props.lineOfReflection} axis`

    props.addToStack(rotate, desc, props.reflect, e)
  }

  return (
    <div className="tab">
      <h1>Reflection</h1>
      <img
        name="ReflectX"
        src={rotate}
        onClick={(e) => handleClick(e, props.lineOfReflection, true)}
      ></img>
      <select
      id="reflectDrop"
      name="setLineOfReflection"
      value={props.lineOfReflection}
      onChange={props.handleChange}
      >{selector()}</select>
      <img
        name="ReflectY"
        src={rotate}
        onClick={(e) => props.reflect(e, props.lineOfReflection, false)}
      ></img>
    </div>
  );
}

export default Reflection;
