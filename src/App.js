import React, { useState } from 'react';
import './App.css';
import {Canvas} from './components/canvasComp'
import Sideboard from './components/SideboardComp'
import {Circle} from './components/circleComp.js'


function App() {
  const [circleInfo, setCircleInfo] = useState({
    centerX: 1100,
    centerY: 900,
    radius: 50,
    fillColour: 'green',
    borderColor: '#003300',
    borderWidth: 10
  })

  return (
    <div className="App">
      <header>
        Graph Hopper
      </header>
      <div className='wrapper'>
        <Canvas />
        <Circle circleInfo = {circleInfo} />
      </div>
      <Sideboard />
    </div>
  );
}



export default App;
