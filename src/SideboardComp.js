import React from 'react';

// import { ReactComponent as Iconup } from './images/upArrow1.svg'
import IconUp from './images/kuba_arrow_button_set_3.svg'
import IconLeft from './images/kuba_arrow_button_set_1.svg'
import IconRight from './images/kuba_arrow_button_set_2.svg'
import IconDown from './images/kuba_arrow_button_set_4.svg'

function Sideboard(props) {

    function HandleClick(e) {
        
        directions[e.target.name].fx();
    };
    const directions = {
        up: {icon: IconUp, fx: ()=>{console.log("up")}},
        down: {icon: IconDown, fx: ()=>{console.log("Down")}},
        left: {icon: IconLeft, fx: ()=>{console.log("<--")}},
        right: {icon: IconRight, fx: ()=>{console.log("Droit")}}
    };

    const buttons = []
    let index
    for(index in directions) {
        buttons.push(<img onClick={HandleClick} key={index} name={index} className="directional button" src= {directions[index].icon}></img>)
    }

    return (
        <div>   
            {buttons}
        </div>
    )
}

export default Sideboard;