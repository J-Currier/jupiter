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

import mathFunctions from "./scripts/math.js";

function Game(props) {
  let shapesArray = ["circle", "square", "star", "rectangle", "triangle"];
  let randomShape = shapesArray[Math.floor(Math.random() * shapesArray.length)];
  randomShape = 'rectangle'
  const [shape, setShape] = useState(randomShape);
  const [tab, setTab] = useState(null);

  // let size = (Math.floor(Math.random() * 4) + 1) * 100;
  let size = 400;

  let startOrientation = Math.floor(Math.random() * 4) + 1;
  startOrientation = 1;

  // let [startAnchorX, startAnchorY] = mathFunctions.shapeMaker(size);
  let [startAnchorX, startAnchorY] = [1000, 1000];

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

  const [fillColour, setFillColour] = useState("rgba(137, 235, 52, 0.8)");
  const [borderColour, setBorderColour] = useState("rgba(255, 255, 255, 0.8)");
  const [borderWidth, setBorderWidth] = useState(10);
  const [shapeClassName, setShapeClassName] = useState("Circle");

  const [moveFactor, setMoveFactor] = useState(1);

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
    fillColour: "rgba(255, 77, 0, 0.8)",
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
      deltaX * moveFactor,
      deltaY * moveFactor
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

  const factorHandle = e => {
    setMoveFactor(e.target.value);
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

  const changeTab = e => {
    if (e.target.id === "translation-button") {
      setTab("translation");
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
    />
  );
  const targetComp = (
    <ShapeComp
      moveBack_shakeVertical={moveBack_shakeVertical}
      moveBack_shakeHorizontal={moveBack_shakeHorizontal}
      shapeInfo={target}
    />
  );

  return (
    <main>
      <div className="wrapper">
        <Grid />
        {playerComp}
        {targetComp}
      </div>
      <Sideboard
        changeTab={changeTab}
        buttonFunction={translate}
        factorHandle={factorHandle}
        moveFactor={moveFactor}
        key="sideboard"
      />
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
