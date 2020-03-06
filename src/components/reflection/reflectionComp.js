import React from "react";
import "./reflection.css";
import rotate from "../../images/rotate-arrow.svg";
// import reflectY from '../../images/btnReflectY.svg'

function Reflection(props) {
  const selector = () => {
    const array = [];
    for (let i = -9; i < 10; i++) {
      array.push(<option key={i}>{i}</option>);
    }
    return array;
  };

  const handleClick = (e, axis) => {
    if(e.target.name === "ReflectX") {
      props.reflect(e, props.lineOfReflection, true)
    } else if(e.target.name === "ReflectY") {
      props.reflect(e, props.lineOfReflection, false)
    } 
    const desc = `Reflect the shape over the ${props.lineOfReflection} axis`

    props.addToStack(rotate, desc, props.reflect)
  }

  return (
    <div className="tab">
      <h1>Reflection</h1>
      <img
        name="ReflectX"
        src={rotate}
        onClick={handleClick}
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
