import React, { useEffect } from 'react';
import './shapeComp.css';

function determineCorners(x, y, d, orientation) {
    const orientations = {
        1: [[x, y], [x + 2 * d, y], [x + 2 * d, y - d], [x, y - d]],
        2: [[x, y], [x + d, y], [x + d, y + 2 * d], [x, y + 2 * d]],
        3: [[x, y], [x - 2 * d, y], [x - 2 * d, y + d], [x, y + d]],
        4: [[x, y], [x - d, y], [x - d, y - 2 * d], [x, y - 2 * d]]
    };
    return orientations[orientation]
};


function Rectangle(props) {
    let {
        id,
        position,
        fillColour,
        borderColour,
        borderWidth,
        shapeClassName
    } = props.shapeInfo;
    let [anchorX, anchorY, size, orientaion] = position;
    let anchorDot = props.anchorDot;
    size = Math.round(size/2);

    let cornerArray = determineCorners(anchorX, anchorY, size, orientaion);

    for (let corner of cornerArray) {
        if (corner[1] < 0 || corner[1] > 2000) {
            props.moveBack_shakeVertical();
            break;
        }
      }
    
    for (let corner of cornerArray) {
        if (corner[0] < 0 || corner[0] > 2000) {
            props.moveBack_shakeHorizontal();
            break;
        }
    }

    useEffect(() => {
        var canvas = document.getElementById(id);
        var context = canvas.getContext("2d");
        canvas.width = 2000;
        canvas.height = 2000;

        function drawRectangle(fillColour, borderColour, borderWidth) {
            context.clearRect(0, 0, canvas.width, canvas.height)
            context.beginPath();
            context.moveTo(cornerArray[0][0], cornerArray[0][1]);
            context.lineTo(cornerArray[1][0], cornerArray[1][1]);
            context.lineTo(cornerArray[2][0], cornerArray[2][1]);
            context.lineTo(cornerArray[3][0], cornerArray[3][1]);
            context.lineTo(cornerArray[0][0], cornerArray[0][1]);
            context.fillStyle = fillColour;
            context.fill();
            context.lineWidth = borderWidth;
            context.strokeStyle = borderColour;
            context.stroke();
        }

        function drawAnchorDot(centerX, centerY, radius, fillColour, borderColour, borderWidth) {
            context.beginPath();
            context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
            context.fillStyle = fillColour;
            context.fill();
            context.lineWidth = borderWidth;
            context.strokeStyle = borderColour;
            context.stroke();
        }

        drawRectangle(fillColour, borderColour, borderWidth);
        if (anchorDot) drawAnchorDot(anchorX, anchorY, size/10, 'white', 'white', borderWidth);
    }, [position]);

    return (
        <div className={shapeClassName}>
            <canvas id={id}></canvas>
        </div>
    );
}

export { Rectangle, determineCorners }
