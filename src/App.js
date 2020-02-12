import React, { useState } from 'react';
import './App.css';

import {Grid} from './components/grid/gridComp'
import Sideboard from './components/Sideboard/SideboardComp'
import {Circle} from './components/shapes/circleComp.js'
import {Square} from './components/shapes/squareComp.js'
import {Triangle} from './components/shapes/triangleComp.js'
import {Heart} from './components/shapes/heartComp.js'
import Translation from './components/translation/translationComp'

import mathFunctions from './scripts/math.js'


function Game (props) {
  let shapesArray = ['circle', 'square'];
  let randomShape = shapesArray[Math.floor(Math.random() * shapesArray.length)];
  const [shape, setShape] = useState(randomShape);
  const [tab, setTab] = useState(null)


  let size = ((Math.floor(Math.random()*4)+1)*100);
  let startOrientation = (Math.floor(Math.random()*4)+1);
  
  let [startAnchorX, startAnchorY] = mathFunctions.shapeMaker(size);
  const [playerPosition, setPlayerPosition] = useState([startAnchorX, startAnchorY, size, startOrientation]);
  
  let [endAnchorX, endAnchorY] = mathFunctions.shapeMaker(size);
  while ((Math.pow((endAnchorX-startAnchorX), 2) + Math.pow((endAnchorY-startAnchorY), 2)) < Math.pow((2*size), 2)) {
    [endAnchorX, endAnchorY] = mathFunctions.shapeMaker(size);
  }
  const [targetPostition, setTargetPosition] = useState([endAnchorX, endAnchorY, size, startOrientation])
  
  const [fillColour, setFillColour] = useState('rgba(137, 235, 52, 1)')
  const [borderColour, setBorderColour] = useState('rgba(255, 255, 255, 1)')
  const [borderWidth, setBorderWidth] = useState(10)
  const [shapeClassName, setShapeClassName] = useState('Circle')

  const [moveFactor, setMoveFactor] = useState(1)

  let player = {
  "id": "myStartPt",
  "position": playerPosition,
  "fillColour": fillColour,
  "borderColour": borderColour,
  "borderWidth": borderWidth,
  "shapeClassName": shapeClassName
  }

  let target = {
    "id": "myEndPt",
    "position": targetPostition,
    "fillColour": 'rgba(255, 77, 0, 1)',
    "borderColour": borderColour,
    "borderWidth": borderWidth,
    "shapeClassName": "endPtCircle"
  }

  const changeClass = (newName) => {
    setShapeClassName(newName)
  }

  const translate = async (e, deltaX, deltaY) => {
    let [newAnchorX, newAnchorY] = mathFunctions.translate(playerPosition[0], playerPosition[1], deltaX*moveFactor, deltaY*moveFactor)
    // if (newAnchorX < size || newAnchorX > 2000-size) {
    //   changeClass('shake-vertical');
    //   newAnchorX = playerPosition[0];
    //   setTimeout(() => {
    //     changeClass("Circle")
    //     }, 500);
    // } else if (newAnchorY < size || newAnchorY > 2000-size) {
    //   changeClass('shake-horizontal');
    //   newAnchorY = playerPosition[1];
    //   setTimeout(() => {
    //     changeClass("Circle")
    //     }, 500);
    // } else {
      await changeClass("fade-out")
      await setTimeout(() => {
        setPlayerPosition([newAnchorX, newAnchorY, playerPosition[2], playerPosition[3]])
        changeClass("fade-in")
      }, 100);
    // }
  }

  const factorHandle = (e) => {
    setMoveFactor(e.target.value)
  }

  const LevelCheck = () => {
    if (JSON.stringify(playerPosition) === JSON.stringify(targetPostition)) {
      return (
        <div className='winner'>
          Portal Locked! <br />
          You Win
        </div>
      )
    } else {
      return (
        <div></div>
      )
    }
  }

  const changeTab = (e) => {
    if(e.target.id === "translation-button"){
      setTab("translation")
  }
  }

  return (
    <main>
      <div className='wrapper'>
        <Grid />
        {shape === 'circle' &&  <Circle shapeInfo={target}/>}
        {shape === 'circle' &&  <Circle shapeInfo={player}/>}
        {shape === 'square' &&  <Square shapeInfo={target}/>}
        {shape === 'square' &&  <Square shapeInfo={player}/>}
        {/* {shape === 'triangle' &&  <Triangle shapeInfo={target}/>}
        {shape === 'triangle' &&  <Triangle shapeInfo={player}/>}
        {shape === 'rectangle' &&  <Rectangle shapeInfo={target}/>}
        {shape === 'rectangle' &&  <Rectangle shapeInfo={player}/>} */}
      </div>
      <Sideboard
        changeTab={changeTab}
        buttonFunction={translate}
        factorHandle={factorHandle}
        moveFactor={moveFactor}
        key='sideboard' />
        {/* {tab === 'translation' &&  <Translation />} */}
      <LevelCheck key='levelCheck'/>
    </main>
  )
}

function App() {
  return (
    <div className="App">
      <Game key='Game' />
    </div>
  );
}

export default App;
