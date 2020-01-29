import React, {useState} from 'react';
import IconUp from '../images/kuba_arrow_button_set_3.svg'
import IconLeft from '../images/kuba_arrow_button_set_1.svg'
import IconRight from '../images/kuba_arrow_button_set_2.svg'
import IconDown from '../images/kuba_arrow_button_set_4.svg'
import IconUndo from '../images/arrow-curved-blue.svg'
import './Sideboard.css'

function Sideboard(props) {

    const [step, setStep] = useState(0); // todo

    function HandleClick(e) {
        buttonInfo[e.target.name].fx(e)
    };
    const buttonInfo = {
        up: {icon: IconUp, fx: (e)=>{props.buttonFunction(e, 0, -100)}},
        left: {icon: IconLeft, fx: (e)=>{props.buttonFunction(e, -100, 0)}},
        right: {icon: IconRight, fx: (e)=>{props.buttonFunction(e, 100, 0)}},
        down: {icon: IconDown, fx: (e)=>{props.buttonFunction(e, 0, 100)}},
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

    // const timeButtons = [];
    // for(let index in buttonInfo) {
    //     if (index==="undo" || index==="redo") {
    //         timeButtons.push(
    //             <img 
    //                 onClick={HandleClick} 
    //                 key={index} 
    //                 name={index}
    //                 id={index} 
    //                 className="time button" 
    //                 src= {buttonInfo[index].icon}
    //             ></img>
    //         );
    //     };
    // };

    return (
        <div id="sideboard">   
            <input 
                type="number" 
                min='0' 
                max='18' 
                onChange={props.factorHandle} 
                value={props.moveFactor} 
                id="factorBox"
            />
            {buttons}
            {/* {timeButtons} */}
        </div>
    )
}

export default Sideboard;