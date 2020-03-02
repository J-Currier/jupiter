import React, { useState } from 'react';
// import IconUp from '../../images/kuba_arrow_button_set_3.svg'
// import IconLeft from '../../images/kuba_arrow_button_set_1.svg'
// import IconRight from '../../images/kuba_arrow_button_set_2.svg'
// import IconDown from '../../images/kuba_arrow_button_set_4.svg'
// import IconUndo from '../../images/arrow-curved-blue.svg'
import './Sideboard.css'
import Translation from '../translation/translationComp'
import Rotation from '../rotation/rotationComp'
import Reflection from '../reflection/reflectionComp'

function Sideboard(props) {

    // const [step, setStep] = useState(0);
    const [tab, setTab] = useState(null)

    function handleClick(e) {
        if(e.target.id === "translation-button"){
            setTab("translation")
        }else if(e.target.id === "reflection-button"){
            setTab("reflection")
        }else if(e.target.id === "rotation-button"){
            setTab("rotation")
        }
    };

    // const buttonInfo = {
    //     up: { icon: IconUp, fx: (e) => { props.buttonFunction(e, 0, -100) } },
    //     left: { icon: IconLeft, fx: (e) => { props.buttonFunction(e, -100, 0) } },
    //     right: { icon: IconRight, fx: (e) => { props.buttonFunction(e, 100, 0) } },
    //     down: { icon: IconDown, fx: (e) => { props.buttonFunction(e, 0, 100) } }
    // };

    // const buttons = [];
    // for (let index in buttonInfo) {
    //     buttons.push(
    //         <img
    //             onClick={handleClick}
    //             key={index}
    //             name={index}
    //             alt={index}
    //             id={index}
    //             className="directional button"
    //             src={buttonInfo[index].icon}
    //         ></img>
    //     );
    // };

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
            <button id="translation-button" className='tab-button' onClick = {handleClick}>Translation</button>
            <button id="rotation-button" className='tab-button' onClick = {handleClick}>Rotation</button>
            <button id="reflection-button" className='tab-button' onClick = {handleClick}>Reflection</button>
            </nav>
            {tab === 'translation' &&  
                <Translation 
                buttonFunction = {props.buttonFunction}
                moveFactor = {props.moveFactor}
                factorHandle = {props.factorHandle}
                />}
            {tab === 'rotation' &&  
                <Rotation 
                // buttonFunction = {props.buttonFunction}
                // moveFactor = {props.moveFactor}
                // factorHandle = {props.factorHandle}
                />}
            {tab === 'reflection' &&  
                <Reflection 
                // buttonFunction = {props.buttonFunction}
                // moveFactor = {props.moveFactor}
                // factorHandle = {props.factorHandle}
                />}


        </div>
    )
}

export default Sideboard;