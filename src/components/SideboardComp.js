import React, {useState} from 'react';

// import { ReactComponent as IconUp } from './images/kuba_arrow_button_set_3.svg'
// import { ReactComponent as IconLeft } from './images/kuba_arrow_button_set_1.svg'
// import { ReactComponent as IconRight } from './images/kuba_arrow_button_set_2.svg'
// import { ReactComponent as IconDown } from './images/kuba_arrow_button_set_4.svg'
import IconUp from '../images/kuba_arrow_button_set_3.svg'
import IconLeft from '../images/kuba_arrow_button_set_1.svg'
import IconRight from '../images/kuba_arrow_button_set_2.svg'
import IconDown from '../images/kuba_arrow_button_set_4.svg'
import IconUndo from '../images/arrow-curved-blue.svg'
import './Sideboard.css'

function Sideboard(props) {

    const [step, setStep] = useState(0); // todo

    function HandleClick(e) {
        buttonInfo[e.target.name].fx();
    };
    const buttonInfo = {
        up: {icon: IconUp, fx: ()=>{console.log("up")}},
        left: {icon: IconLeft, fx: ()=>{console.log("<--")}},
        right: {icon: IconRight, fx: ()=>{console.log("Droit")}},
        down: {icon: IconDown, fx: ()=>{console.log("Down")}},
        undo: {icon: IconUndo, fx: setStep},
        redo: {icon: IconUndo, fx: setStep}
    };

    const buttons = [];
    for(let index in buttonInfo) {
        if (index==="up" || index==="down" || index==="left" || index==="right") {
            buttons.push(
                <img 
                    onClick={HandleClick} 
                    key={index} 
                    name={index} 
                    id={index}
                    className="directional button" 
                    src= {buttonInfo[index].icon}
                ></img>
            );
        };
    };

    const timeButtons = [];
    for(let index in buttonInfo) {
        if (index==="undo" || index==="redo") {
            timeButtons.push(
                <img 
                    onClick={HandleClick} 
                    key={index} 
                    name={index}
                    id={index} 
                    className="time button" 
                    src= {buttonInfo[index].icon}
                ></img>
            );
        };
    };


    return (
        <div id="sideboard">   
            {buttons}
            {timeButtons}
        </div>
    )
}

export default Sideboard;