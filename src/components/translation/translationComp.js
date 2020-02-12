import React, { PureComponent } from 'react'
import IconUp from '../../images/kuba_arrow_button_set_3.svg'
import IconLeft from '../../images/kuba_arrow_button_set_1.svg'
import IconRight from '../../images/kuba_arrow_button_set_2.svg'
import IconDown from '../../images/kuba_arrow_button_set_4.svg'
import IconUndo from '../../images/arrow-curved-blue.svg'
import './translation.css'


function Translation(props) {

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


    return(
        <div id= "translation">
            Translation
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

export default Translation