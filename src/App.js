import React, { useState } from 'react';
import './App.css';
import { Grid } from './components/gridComp'
import Sideboard from './components/SideboardComp'
import { Circle, EndPtCircle } from './components/circleComp.js'


function App() {

  const getRandomNumber = () => {
    let newPosition = (Math.floor(Math.random()*10))*200

    if (newPosition == 0 || newPosition == 2000) {
      newPosition = 300;
    }
    return newPosition
  }

  const getRandomEnd = (axis) => {
    let newPositon = getRandomNumber();
    while (newPositon == axis){
      newPositon= getRandomNumber()
    }
    return newPositon;
  }

  const [centerX, setCenterX] = useState(getRandomNumber())
  const [centerY, setCenterY] = useState(getRandomNumber())
  const [radius, setRadius] = useState(50)
  const [fillColour, setFillColour] = useState('rgba(137, 235, 52, 1)')
  const [borderColour, setBorderColour] = useState('rgba(0, 0, 0, 1)')
  const [borderWidth, setBorderWidth] = useState(10)
  const [shapeClassName, setShapeClassName] = useState('Circle')

  const [endPtX, setEndPtX] = useState(getRandomEnd(centerX))
  const [endPtY, setEndPtY] = useState(getRandomEnd(centerY))
  const [moveFactor, setMoveFactor] = useState(1)
  const [gameDiv, setGameDiv] = useState('wrapper')

  const changeClass = (newName) => {
    setShapeClassName(newName)
  }

  const handleClick = async (e, deltaX, deltaY) => {
    let newCenterX = (deltaX*moveFactor) + centerX;
    let newCenterY = (deltaY*moveFactor) + centerY;
    if (newCenterX < 100 || newCenterX > 1900) {
      changeClass('shake-vertical');
      newCenterX = centerX;
      setTimeout(() => {
        changeClass("Circle")
        }, 500);
    } else if (newCenterY < 100 || newCenterY > 1900) {
      changeClass('shake-horizontal');
      newCenterY = centerY;
      setTimeout(() => {
        changeClass("Circle")
        }, 500);
    } else {
    await changeClass("fade-out")
    await setTimeout(() => {

      moveCircle(newCenterX, newCenterY); 
      changeClass("fade-in")
    }, 100);
    }
  }

  function factorHandle(e) {
    setMoveFactor(e.target.value)
    
}

  const Game = (props) => {
    return (
      <main>
        <div className='wrapper'>
          <Grid />
          <EndPtCircle circleInfo={endPtInfo} />
          <Circle circleInfo={circleInfo}
           />
        </div>
        <Sideboard
          buttonFunction={handleClick}
          factorHandle={factorHandle}
          moveFactor={moveFactor}

          key='sideboard' />
        <LevelCheck key='levelCHeck'/>
      </main>
    )
  }
  const LevelCheck = () => {

    
    if ((centerX == endPtX) && (centerY == endPtY)) {
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

  const moveCircle = (newX, newY) => {
    setCenterX(newX)
    setCenterY(newY)
  }
  let circleInfo = {
    "centerX": centerX,
    "centerY": centerY,
    "radius": radius,
    "fillColour": fillColour,
    "borderColour": borderColour,
    "borderWidth": borderWidth,
    "shapeClassName": shapeClassName
  }

  let endPtInfo = {
    "endPtX": endPtX,
    "endPtY": endPtY,
    "radius": radius,
    "fillColour": 'rgba(255, 77, 0, 1)',
    "borderColour": borderColour,
    "borderWidth": borderWidth,
    "shapeClassName": "endPtCircle"
  }


  return (
    <div className="App">
      {/* <header>
        Graph Hopper
      </header> */}
      <Game key='Game' />

    </div>
  );
}



export default App;
