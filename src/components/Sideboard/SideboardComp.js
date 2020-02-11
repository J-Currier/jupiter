import React, { useState } from 'react';
import IconUp from '../../images/kuba_arrow_button_set_3.svg'
import IconLeft from '../../images/kuba_arrow_button_set_1.svg'
import IconRight from '../../images/kuba_arrow_button_set_2.svg'
import IconDown from '../../images/kuba_arrow_button_set_4.svg'
import IconUndo from '../../images/arrow-curved-blue.svg'
import './Sideboard.css'

function Sideboard(props) {

    // const [step, setStep] = useState(0);

    function handleClick(e) {
        buttonInfo[e.target.name].fx(e)
    };
    const buttonInfo = {
        up: { icon: IconUp, fx: (e) => { props.buttonFunction(e, 0, -100) } },
        left: { icon: IconLeft, fx: (e) => { props.buttonFunction(e, -100, 0) } },
        right: { icon: IconRight, fx: (e) => { props.buttonFunction(e, 100, 0) } },
        down: { icon: IconDown, fx: (e) => { props.buttonFunction(e, 0, 100) } }
    };

    const buttons = [];
    for (let index in buttonInfo) {
        buttons.push(
            <img
                onClick={handleClick}
                key={index}
                name={index}
                alt={index}
                id={index}
                className="directional button"
                src={buttonInfo[index].icon}
            ></img>
        );
    };

    // const undoButtons = [
    //     <img 
    //         onClick={() => setStep(initial => initial -1)} 
    //         key="undo"
    //         name="undo"
    //         alt="undo"
    //         id="undo"
    //         className="undo button" 
    //         src= {IconUndo}
    //     ></img>,
    //     <img 
    //         onClick={() => setStep(initial => initial +1)} 
    //         key="redo"
    //         name="redo"
    //         alt="redo"
    //         id="redo"
    //         className="undo button" 
    //         src= {IconUndo}
    //     ></img>
    // ];

    return (
        <div id="sideboard">
            <nav>
            <button>Translation</button>
            <button>Rotation</button>
            <button>Reflection</button>
            </nav>
            <input
                type="number"
                min='0'
                max='18'
                onChange={props.factorHandle}
                value={props.moveFactor}
                id="factorBox"
            />
            {buttons}
            {/* {undoButtons} */}
        </div>
    )
}

export default Sideboard;