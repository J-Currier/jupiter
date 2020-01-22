import React, { useState } from 'react';
import './App.css';
import { Grid } from './components/gridComp'
import Sideboard from './components/SideboardComp'
import { Circle } from './components/circleComp.js'


function App() {
  // const [circleInfo, setCircleInfo] = useState({
  //   centerX: 1100,
  //   centerY: 900,
  //   radius: 50,
  //   fillColour: 'green',
  //   borderColor: '#003300',
  //   borderWidth: 10
  // })

  const [centerX, setCenterX] = useState(1100)
  const [centerY, setCenterY] = useState(900)
  const [radius, setRadius] = useState(50)
  const [fillColour, setFillColour] = useState('rgba(137, 235, 52, 1)')
  const [borderColour, setBorderColour] = useState('rgba(0, 0, 0, 1)')
  const [borderWidth, setBorderWidth] = useState(10)
  const [shapeClassName, setShapeClassName] = useState('Circle')

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
  console.log(circleInfo)

  return (
    <div className="App">
      <header>
        Graph Hopper
      </header>
      <main>
        <div className='wrapper'>
          <Grid />
          <Circle circleInfo={circleInfo} />
        </div>
        <Sideboard
          buttonFunction={handleClick} />
      </main>
    </div>
  );
}



export default App;
