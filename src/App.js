import React, { useState } from "react";
import "./App.css";

import { Grid } from "./components/grid/gridComp";
import Sideboard from "./components/Sideboard/SideboardComp";
import { Circle } from "./components/shapes/circleComp.js";
import { Square } from "./components/shapes/squareComp.js";
import { Triangle } from "./components/shapes/triangleComp.js";
// import { Heart } from "./components/shapes/heartComp.js";
import { Star } from "./components/shapes/starComp.js";
import { Rectangle } from "./components/shapes/rectangleComp.js";
import { CallStack, CallCard } from './components/callStack/callStack'


import mathFunctions from "./scripts/math.js";

function Game(props) {
  let shapesArray = ["circle", "square", "star", "rectangle", "triangle"];
  let randomShape = shapesArray[Math.floor(Math.random() * shapesArray.length)];

  const [shape, setShape] = useState(randomShape);

  let size = (Math.floor(Math.random() * 3) + 2) * 100; // returns a random int between 4 and 2 (both inclusive)
  let randomOrientation = Math.floor(Math.random() * 8);
  let startOrientation = [4, 3, 2, 1, -1, -2, -3, -4][randomOrientation];

  let [startAnchorX, startAnchorY] = mathFunctions.shapeMaker(size);
  const [playerPositionsArray, setPlayerPositionsArray] = useState([
    [startAnchorX, startAnchorY, size, startOrientation]
  ]);
  const [
    playerAcceptablePositionsArray,
    setplayerAcceptablePositionsArray
  ] = useState([[startAnchorX, startAnchorY, size, startOrientation]]);
  const [playerPosition, setPlayerPosition] = useState([
    startAnchorX,
    startAnchorY,
    size,
    startOrientation
  ]);

  let [endAnchorX, endAnchorY] = mathFunctions.shapeMaker(size);
  while (
    Math.pow(endAnchorX - startAnchorX, 2) +
    Math.pow(endAnchorY - startAnchorY, 2) <
    Math.pow(2 * size, 2)
  ) {
    [endAnchorX, endAnchorY] = mathFunctions.shapeMaker(size);
  }
  const [targetPostition, setTargetPosition] = useState([
    endAnchorX,
    endAnchorY,
    size,
    startOrientation
  ]);

  const [fillColour, setFillColour] = useState("rgba(137, 235, 52, 0.6)");
  const [borderColour, setBorderColour] = useState("rgba(255, 255, 255, 1)");
  const [borderWidth, setBorderWidth] = useState(6);
  const [shapeClassName, setShapeClassName] = useState("Circle");

  const [translationFactor, setTranslationFactor] = useState(1);
  const [pivotPointx, setPivotPointx] = useState(0);
  const [pivotPointy, setPivotPointy] = useState(0);
  const [rotationMag, setRotationMag] = useState("180°");
  const [lineOfReflection, setLineOfReflection] = useState(0);
  const transformFunctions = {
    "setTranslationFactor": setTranslationFactor,
    "setPivotPointx": setPivotPointx,
    "setPivotPointy": setPivotPointy,
    "setRotationMag": setRotationMag,
    "setLineOfReflection": setLineOfReflection
  }

  const [callStackComps, setCallStackComps] = useState([]);
  const [counter, setCounter] = useState(0)

  let player = {
    id: "myStartPt",
    position: playerPosition,
    fillColour: fillColour,
    borderColour: borderColour,
    borderWidth: borderWidth,
    shapeClassName: shapeClassName
  };

  let target = {
    id: "myEndPt",
    position: targetPostition,
    fillColour: "rgba(255, 77, 0, 0.6)",
    borderColour: borderColour,
    borderWidth: borderWidth,
    shapeClassName: "endPtCircle"
  };

  const changeClass = newName => {
    setShapeClassName(newName);
  };

  const translate = async (e, deltaX, deltaY) => {
    let [newAnchorX, newAnchorY] = mathFunctions.translate(
      playerPosition[0],
      playerPosition[1],
      deltaX * translationFactor,
      deltaY * translationFactor
    );
    playerPositionsArray.push([
      newAnchorX,
      newAnchorY,
      playerPosition[2],
      playerPosition[3]
    ]);
    playerAcceptablePositionsArray.push([
      newAnchorX,
      newAnchorY,
      playerPosition[2],
      playerPosition[3]
    ]);
    await changeClass("fade-out");
    await setTimeout(() => {
      setPlayerPosition([
        newAnchorX,
        newAnchorY,
        playerPosition[2],
        playerPosition[3]
      ]);
      changeClass("fade-in");
    }, 100);
  };

  const reflect = async (e, lineOfReflection) => {
    let myArray= [];
    if (e.target.name === 'ReflectX') {
      myArray = [true, false, lineOfReflection];
    }
    if (e.target.name === 'ReflectY') {
      myArray = [false, true, lineOfReflection];
    }
    let [newAnchorX, newAnchorY, newOrientation] = mathFunctions.reflect(
      playerPosition,
      myArray //[xRefl(t/f),yReflec(t/f), value]
    );
    playerPositionsArray.push([
      newAnchorX,
      newAnchorY,
      playerPosition[2],
      newOrientation
    ]);
    playerAcceptablePositionsArray.push([
      newAnchorX,
      newAnchorY,
      playerPosition[2],
      newOrientation
    ]);
    await changeClass("fade-out");
    await setTimeout(() => {
      setPlayerPosition([
        newAnchorX,
        newAnchorY,
        playerPosition[2],
        newOrientation
      ]);
      changeClass("fade-in");
    }, 100);
  };

  const rotate = async (e, magnitude, direction) => {  //direction true= ccw
    magnitude = magnitude.slice(0, -1)
    magnitude = Number(magnitude);
    let pointOfRotation = [pivotPointx, pivotPointy];
    console.log(e.target, magnitude, direction)
    let [newAnchorX, newAnchorY, newOrientation] = mathFunctions.rotate(
      magnitude, 
      direction,
      pointOfRotation,
      playerPosition
    );
      playerPositionsArray.push([
      newAnchorX,
      newAnchorY,
      playerPosition[2],
      newOrientation
    ]);
     playerAcceptablePositionsArray.push([
      newAnchorX,
      newAnchorY,
      playerPosition[2],
      newOrientation
    ]);
    console.log(newAnchorX,
      newAnchorY,
      playerPosition[2],
      newOrientation)
    await changeClass("fade-out");
    await setTimeout(() => {
      setPlayerPosition([
        newAnchorX,
        newAnchorY,
        playerPosition[2],
        newOrientation
        ]);
      changeClass("fade-in");
    }, 100);
  };



  const moveBack_shakeVertical = async () => {
    playerAcceptablePositionsArray.pop();
    await setPlayerPosition(
      playerAcceptablePositionsArray[playerAcceptablePositionsArray.length - 1]
    );
    changeClass("shake-vertical");
  };

  const moveBack_shakeHorizontal = async () => {
    playerAcceptablePositionsArray.pop();
    await setPlayerPosition(
      playerAcceptablePositionsArray[playerAcceptablePositionsArray.length - 1]
    );
    changeClass("shake-horizontal");
  };

  const handleChange = e => {
    let name = e.target.name
    transformFunctions[name](e.target.value)
  };

  const LevelCheck = () => {
    if (JSON.stringify(playerPosition) === JSON.stringify(targetPostition)) {
      return (
        <div className="winner">
          Portal Locked! <br />
          You Win
        </div>
      );
    } else {
      return <div></div>;
    }
  };

  const shapeCompsObj = {
    circle: Circle,
    square: Square,
    triangle: Triangle,
    rectangle: Rectangle,
    star: Star
    // heart: Heart
  };
  const ShapeComp = shapeCompsObj[shape];
  const playerComp = (
    <ShapeComp
      moveBack_shakeVertical={moveBack_shakeVertical}
      moveBack_shakeHorizontal={moveBack_shakeHorizontal}
      shapeInfo={player}
      anchorDotSize={9}
    />
  );
  const targetComp = (
    <ShapeComp
      moveBack_shakeVertical={moveBack_shakeVertical}
      moveBack_shakeHorizontal={moveBack_shakeHorizontal}
      shapeInfo={target}
      anchorDotSize={9}
    />
  );

  const font = 'M PLUS Rounded 1c';


  function addToStack(image, desc, fx, para) {
    setCounter(prevCounter => prevCounter + 1)
    console.log(counter)
    let newComp = 
      <CallCard
        image={image}
        // fx={fx}
        desc = {desc}
        key={counter} />;

    setCallStackComps((prev) => [...prev, newComp])
    // callStackComps.push(
    //   <CallCard
    //     // image={image}
    //     // fx={fx}
    //     desc = {desc}
    //     key={counter} />
    // )
    // setCallStackComps(callStackComps)

  }
  return (
    <main>
      <div className="canvasWrapper">
        <Grid />
        {targetComp}
        {playerComp}
      </div>
      <div className="controlerWrapper">
        <Sideboard
          translate={translate}
          rotate={rotate}
          reflect={reflect}
          handleChange={handleChange}
          translationFactor={translationFactor}
          pivotPointx={pivotPointx}
          pivotPointy={pivotPointy}
          rotationMag={rotationMag}
          lineOfReflection={lineOfReflection}
          addToStack={addToStack}
          key="sideboard"
        />
        <CallStack
          callStackComps={callStackComps}
        />
      </div>
      <LevelCheck key="levelCheck" />
    </main>
  );
}

function App() {
  return (
    <div className="App">
      <Game key="Game" />
    </div>
  );
}

export default App;
