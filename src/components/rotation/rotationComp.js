import React, { PureComponent } from 'react'
import rotate from '../../images/rotate-arrow.svg'
import './rotation.css'

function Rotation(props) {

    return(
        <div id='rotation' className='tab'>
            <h1>Rotation</h1>
            <img id="rotate-left" src={rotate}></img>
            <input></input>
            <input></input>
            <img id="rotate-right" src={rotate}></img>
            
            <select>
                <option>90°</option>
                <option>180°</option>
                <option>270°</option>
            </select>
        </div>
    )
    
}

export default Rotation 