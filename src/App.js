import React, { useState } from 'react';
import './App.css';

import {Grid} from './components/gridComp'
import Sideboard from './components/SideboardComp'
import {Circle} from './components/circleComp.js'
import {Square} from './components/squareComp.js'
import {Triangle} from './components/triangleComp.js'
import {Heart} from './components/heartComp.js'


import mathFunctions from './scripts/math.js'


function Game (props) {
  let size = (Math.floor(Math.random()*2)+1)*100;
  let startPoint = mathFunctions.shapeMaker('circle', size)
  const [PlayerPosition, setPlayerPosition] = useState(startPoint)
  const [fillColour, setFillColour] = useState('rgba(137, 235, 52, 1)')
  const [borderColour, setBorderColour] = useState('rgba(0, 0, 0, 1)')
  const [borderWidth, setBorderWidth] = useState(10)
  const [shapeClassName, setShapeClassName] = useState('Circle')

  let endPoint = mathFunctions.shapeMaker('circle', size)
  while ((Math.pow((endPoint[0]-PlayerPosition[0]), 2) + Math.pow((endPoint[1]-PlayerPosition[1]), 2)) < Math.pow((2*size), 2)) {
    console.log(endPoint, PlayerPosition)
    endPoint = mathFunctions.shapeMaker('circle', size)
  }
  const [targetPostition, setTargetPosition] = useState(endPoint)
  const [moveFactor, setMoveFactor] = useState(1)

  let playerCircle = {
  "id": "myCircle",
  "position": PlayerPosition,
  "fillColour": fillColour,
  "borderColour": borderColour,
  "borderWidth": borderWidth,
  "shapeClassName": shapeClassName
  }

  let targetCircle = {
    "id": "myEndPt",
    "position": targetPostition,
    "fillColour": 'rgba(255, 77, 0, 1)',
    "borderColour": borderColour,
    "borderWidth": borderWidth,
    "shapeClassName": "endPtCircle"
  }

  let squareInfo = {
    "id": "mySquare",
    'position': [1000, 1000, 200, 4],
    "fillColour": 'rgba(0, 0, 0, 1)',
    "borderColour": 'rgba(0, 0, 0, 1)',
    "borderWidth": borderWidth,
    "shapeClassName": 'endPtsquare',
  }

  const changeClass = (newName) => {
    setShapeClassName(newName)
  }

  const translateCircle = async (e, deltaX, deltaY) => {
    let [newCenterX, newCenterY] = mathFunctions.translate(PlayerPosition[0], PlayerPosition[1], deltaX*moveFactor, deltaY*moveFactor)
    if (newCenterX < 100 || newCenterX > 1900) {
      changeClass('shake-vertical');
      newCenterX = PlayerPosition[0];
      setTimeout(() => {
        changeClass("Circle")
        }, 500);
    } else if (newCenterY < 100 || newCenterY > 1900) {
      changeClass('shake-horizontal');
      newCenterY = PlayerPosition[1];
      setTimeout(() => {
        changeClass("Circle")
        }, 500);
    } else {
    await changeClass("fade-out")
    await setTimeout(() => {
      setPlayerPosition([newCenterX, newCenterY, PlayerPosition[2]])
      changeClass("fade-in")
    }, 100);
    }
  }

  const factorHandle = (e) => {
    setMoveFactor(e.target.value)
  }

  const LevelCheck = () => {
    if (JSON.stringify(PlayerPosition) === JSON.stringify(targetPostition)) {
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

  return (
    <main>
      <div className='wrapper'>
        <Grid />
        <Circle circleInfo={targetCircle}/>
        <Circle circleInfo={playerCircle}/>
        <Heart shapeInfo={squareInfo}/>


      </div>
      <Sideboard
        buttonFunction={translateCircle}
        factorHandle={factorHandle}
        moveFactor={moveFactor}
        key='sideboard' />
      <LevelCheck key='levelCHeck'/>
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
