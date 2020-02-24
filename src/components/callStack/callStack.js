import React, { useState } from 'react'
import './callStack.css'
import rotation from '../../images/rotate-arrow.svg'



export function CallCard(img, fx, cardId) {
    let image
    if (img == 'rotation') {
        image = rotation
    } else {
        image = "not an image"
    }
    return(
        <div className="calling-card" id={cardId}>
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
            image = {'rotation'} 
            fx = {() => {}} 
            cardId = {1}/>
            <CallCard 
            img = {'words'} 
            fx = {() => {}} 
            cardId = {2}/>
            <CallCard 
            img = {'img'} 
            fx = {() => {}} 
            cardId = {3}/>
            <CallCard 
            img = {'img'} 
            fx = {() => {}} 
            cardId = {4}/>
            
            <button>CLEAR</button>
            <button>RUN</button>

        </div>
    )
}

export default CallStack