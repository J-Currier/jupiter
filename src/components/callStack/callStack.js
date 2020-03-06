import React, { useState } from 'react'
import './callStack.css'
import rotation from '../../images/rotate-arrow.svg'
import translateLeft from '../../images/kuba_arrow_button_set_1.svg'



export function CallCard(props) {

    const Svg = props.image
    return(
        <div className="calling-card" id={props.id} key = {props.id}>
            <Svg />
            <p>{props.desc}</p>
            <button>X</button>
        </div>
    )
}


export function CallStack(props) {
    return(
        <div  className='call-stack'>
            {props.callStackComps}
            <div className='button-div'>
            <button id='clear-button'>CLEAR</button>
            <button id='run-button'>RUN</button>
            </div>
        </div>
    )
}

// export default {CallStack, CallCard}