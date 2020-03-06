import React, { useState } from 'react'
import './callStack.css'
import rotation from '../../images/rotate-arrow.svg'
import translateLeft from '../../images/kuba_arrow_button_set_1.svg'



export function CallCard(props) {

    // if (props.img === 'rotation') {
    //     image = rotation
    // } else if (props.img === 'translation' && props.direction === 'left') {
    //     image = translateLeft
    // }
    // else {
    //     image = "not an image"
    // }
    const Svg = props.image
    return(
        <div className="calling-card" id={props.key}>
            {/* <img src={props.image}></img> */}
            <Svg />
            <p>{props.desc}</p>
            <button>X</button>
        </div>
    )
}


export function CallStack(props) {

    // function addToStack(image, fx, counter) {
    //     props.callStackComps.push(
    //         <CallCard
    //         image = {image}
    //         fx = {fx}
    //         cardId = {counter}/>
    //     )
    // }



    return(
        <div  className='call-stack'>
            {props.callStackComps}
            <button>CLEAR</button>
            <button>RUN</button>
        </div>
    )
}

// export default {CallStack, CallCard}