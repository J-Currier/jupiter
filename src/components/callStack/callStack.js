import React, { useState } from 'react'
import './callStack.css'
import rotation from '../../images/rotate-arrow.svg'
import translateLeft from '../../images/kuba_arrow_button_set_1.svg'



export function CallCard(props) {
    let image
    let desc
    if (props.img === 'rotation') {
        image = rotation
    } else if (props.img === 'translation' && props.direction === 'left') {
        image = translateLeft
    }  
    else {
        image = "not an image"
    }
    return(
        <div className="calling-card" id={props.cardId}>
            <img src={image}></img>
            description
            <button>X</button>
        </div>        
    )
}


function CallStack(fx) {
    const [stack, setStack] = useState([]);
    const [counter, setCounter] = useState(0);

    function addToStack(image, fx, counter) {
        stack.push(
            <CallCard 
            image = {image} 
            fx = {fx} 
            cardId = {counter}/>
        )


    }



    return(
        <div  className='call-stack'>
            <CallCard 
            img = {'rotation'} 
            direction = {'left'}
            fx = {() => {}} 
            cardId = {1}/>
            <CallCard 
            img = {'translation'} 
            direction = {'left'}
            fx = {() => {}} 
            cardId = {2}/>
            <CallCard 
            img = {'translation'} 
            direction = {'left'}
            fx = {() => {}} 
            cardId = {3}/>
            <CallCard 
            img = {'translation'} 
            direction = {'left'}
            fx = {() => {}} 
            cardId = {4}/>
            <button>CLEAR</button>
            <button>RUN</button>
        </div>
    )
}

export default CallStack