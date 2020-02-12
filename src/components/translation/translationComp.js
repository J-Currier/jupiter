import React, { PureComponent } from 'react'

function Translation(props) {

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
        <div>
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