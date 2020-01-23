import React, { useState } from 'react';
import './App.css';
import { Grid } from './components/gridComp'
import Sideboard from './components/SideboardComp'
import { Circle, EndPtCircle } from './components/circleComp.js'


function App() {
  // const [circleInfo, setCircleInfo] = useState({
  //   centerX: 1100,
  //   centerY: 900,
  //   radius: 50,
  //   fillColour: 'green',
  //   borderColor: '#003300',
  //   borderWidth: 10
  // })
  // const randomCenterX = getRandomNumber();
  const getRandomNumber = () => {
    let newPosition = (Math.floor(Math.random()*10))*200

    if (newPosition == 0 || newPosition == 2000) {
      newPosition = 300;
    }
    console.log(newPosition)
    return newPosition
  }

  const getRandomEnd = (axis) => {
    let newPositon = getRandomNumber();
    while (newPositon == axis){
      newPositon= getRandomNumber()
    }
    return newPositon;
  }

  const [centerX, setCenterX] = useState( getRandomNumber())
  const [centerY, setCenterY] = useState(getRandomNumber())
  const [radius, setRadius] = useState(50)
  const [fillColour, setFillColour] = useState('rgba(137, 235, 52, 1)')
  const [borderColour, setBorderColour] = useState('rgba(0, 0, 0, 1)')
  const [borderWidth, setBorderWidth] = useState(10)
  const [shapeClassName, setShapeClassName] = useState('Circle')

  const [endPtX, setEndPtX] = useState(getRandomEnd(centerX))
  const [endPtY, setEndPtY] = useState(getRandomEnd(centerY))
  const [gameDiv, setGameDiv] = useState('wrapper')

  const changeClass = (newName) => {
    setShapeClassName(newName)
  }

  const handleClick = async (e, deltaX, deltaY) => {
    await changeClass("fade-out")
    await setTimeout(() => {
      moveCircle(deltaX + centerX, deltaY + centerY)
      changeClass("fade-in")
    }, 500);

  }

  const LevelCheck = () => {

    
    if ((centerX == endPtX) && (centerY == endPtY)) {
      return (
        <main>
          <div className='wrapper'>
            <Grid />
            <EndPtCircle circleInfo={endPtInfo} />
            <Circle circleInfo={circleInfo} />
          </div>
          <Sideboard
          buttonFunction={handleClick} />
        <div className='winner'>
          Portal Locked! <br />
          You Win
        </div>
          </main>
      )} else {
          return (
            <main>
            <div className='wrapper'>
              <Grid />
              <EndPtCircle circleInfo={endPtInfo} />
              <Circle circleInfo={circleInfo} />
            </div>
            <Sideboard
            buttonFunction={handleClick} />
            </main>

        
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
    "fillColour": fillColour ,
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
      <LevelCheck />
        
    </div>
  );
}



export default App;
