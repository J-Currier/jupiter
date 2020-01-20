import React from 'react';
import './App.css';
import {Canvas} from './canvasComp.js'
import Sideboard from './SideboardComp.js'

function App() {


  return (
    <div className="App">
      <header>
        Graph Hopper
      </header>
      <Canvas />
      <Sideboard />
    
    </div>
  );
}



export default App;
