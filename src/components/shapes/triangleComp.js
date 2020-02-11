import React, { useEffect } from 'react';
import './shapeComp.css';

function Triangle(props) {
    console.log('triangle')
    // postion is array of anchorX, anchorY, length
    let {id, position, fillColour, borderColour, borderWidth, shapeClassName} = props.shapeInfo //props.circleInfo -> props.shapeInfo
    let [anchorX, anchorY, size, orientation] = position
    let length1= size*2;
    let length2= 400

    useEffect(() => {
        var canvas = document.getElementById(id);
        var context = canvas.getContext("2d");
        canvas.width = 2000;
        canvas.height = 2000;
        console.log(anchorX, anchorY, length1, length2, orientation, 'preca')
        let cornerArray = determineCorners(anchorX, anchorY, length1, length2, orientation);
        console.log(cornerArray, 'cornerarray')

        function drawTriangle( fillColour, borderColour, borderWidth) {
            context.clearRect(0, 0, canvas.width, canvas.height)
            context.beginPath();
            context.moveTo(cornerArray[0][0], cornerArray[0][1]);
            context.lineTo(cornerArray[1][0], cornerArray[1][1]);
            context.lineTo(cornerArray[2][0], cornerArray[2][1]);
            context.moveTo(cornerArray[0][0], cornerArray[0][1]);
            context.fill();
            context.fillStyle = fillColour;
            
            context.lineWidth = borderWidth;
            context.strokeStyle = borderColour;
            context.stroke();
        }
            
        drawTriangle(fillColour, borderColour, borderWidth); 

    }, [anchorX, anchorY, size, orientation]);
    
    return (
      <div className={shapeClassName}>
          <canvas id={id}></canvas>
      </div>
    );
}

function determineCorners (anchorX, anchorY, length1, length2, orientation) {
    if (orientation === 1) {
        return  [[anchorX, anchorY],[anchorX + length2, anchorY],[anchorX, anchorY-length1]];
    }
    if (orientation === 2) {
        return  [[anchorX, anchorY],[anchorX + length1, anchorY],[anchorX, anchorY+length2]];
    }
    if (orientation === 3) {
        return  [[anchorX, anchorY],[anchorX, anchorY + length1],[anchorX-length2, anchorY]];
    }
    if (orientation === 4) {
        return [[anchorX, anchorY],[anchorX - length1, anchorY],[anchorX, anchorY - length2]];
    }
}



export {Triangle, determineCorners}