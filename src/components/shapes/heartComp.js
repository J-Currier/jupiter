import React, { useEffect } from 'react';
import './shapeComp.css';

function Heart(props) {
    // postion is array of anchorX, anchorY, length
    let {id, position, fillColour, borderColour, borderWidth, shapeClassName} = props.shapeInfo //props.circleInfo -> props.shapeInfo
    let [anchorX, anchorY, size, orientaion] = position
    size = 400;


    useEffect(() => {
        var canvas = document.getElementById(id);
        var context = canvas.getContext("2d");
        canvas.width = 2000;
        canvas.height = 2000;

//         let cornerArray = determineCorners(position[0], position[1], position[2], position[3]);
    function drawHeart() {

        var x = 1000;
        var y = 800; //anchorY-200
        var width = 300 ;
        var height = 400;
    
        context.save();
        context.beginPath();
        var topCurveHeight = height * 0.3;
        context.moveTo(x, y + topCurveHeight);
        // top left curve
        context.bezierCurveTo(
        x, y, 
        x - width / 2, y, 
        x - width / 2, y + topCurveHeight
        );
    
        // bottom left curve
        context.bezierCurveTo(
        x - width / 2, y + (height + topCurveHeight) / 2, 
        x, y + (height + topCurveHeight) / 2, 
        x, y + height
        );

        // bottom right curve
    context.bezierCurveTo(
        x, y + (height + topCurveHeight) / 2, 
        x + width / 2, y + (height + topCurveHeight) / 2, 
        x + width / 2, y + topCurveHeight
    );

    // top right curve
    context.bezierCurveTo(
        x + width / 2, y, 
        x, y, 
        x, y + topCurveHeight
    );

    context.closePath();
    context.fillStyle = fillColour;
    context.fill();
    context.restore();

    }
//         function drawSquare( fillColour, borderColour, borderWidth) {
//             context.clearRect(0, 0, canvas.width, canvas.height)
//             context.beginPath();
//             context.moveTo(cornerArray[0][0], cornerArray[0][1]);
//             context.lineTo(cornerArray[1][0], cornerArray[1][1]);
//             context.lineTo(cornerArray[2][0], cornerArray[2][1]);
//             context.lineTo(cornerArray[3][0], cornerArray[3][1]);
//             context.fill();
//             context.fillStyle = fillColour;
            
//             context.lineWidth = borderWidth;
//             context.strokeStyle = borderColour;
//             context.stroke();
//         }
            
        drawHeart(fillColour, borderColour, borderWidth); 

    }, [anchorX, anchorY, size, orientaion]);

    
    return (
      <div className={shapeClassName}>
          <canvas id={id}></canvas>
      </div>
    );
}

// function determineCorners (anchorX, anchorY, length, orientation) {
//     if (orientation === 1) {
//         return  [[anchorX, anchorY],[anchorX + length, anchorY],[anchorX+length, anchorY-length],[anchorX, anchorY-length]];
//     }
//     if (orientation === 2) {
//         return  [[anchorX, anchorY],[anchorX + length, anchorY],[anchorX+length, anchorY+length],[anchorX, anchorY+length]];
//     }
//     if (orientation === 3) {
//         return  [[anchorX, anchorY],[anchorX - length, anchorY],[anchorX-length, anchorY+length],[anchorX, anchorY+length]];
//     }
//     if (orientation  === 4) {
//         return [[anchorX, anchorY],[anchorX - length, anchorY],[anchorX-length, anchorY-length],[anchorX, anchorY-length]];
//     }
// }



export {Heart}