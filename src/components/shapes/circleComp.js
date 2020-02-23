import React, { useEffect } from 'react';
import './shapeComp.css';
import shapesFunctions from "./shapesFunctions.js";

function determineAnchor (centerX, centerY, radius, orientaion) {
    const orientations = {
        1: [centerX+radius, centerY],
        2: [centerX, centerY+radius],
        3: [centerX-radius, centerY],
        4: [centerX, centerY-radius]
    };
    return orientations[orientaion]
};

function Circle(props) {
    let {
        id,
        position,
        fillColour,
        borderColour,
        borderWidth,
        shapeClassName
    } = props.shapeInfo;
    let [centerX, centerY, size, orientaion] = position;
    let anchorDot = props.anchorDot;
    let radius = size/2;
    let anchor = determineAnchor (centerX, centerY, radius, orientaion);
    
    if (centerY < radius || centerY > 2000-radius) {
        props.moveBack_shakeVertical();
    }
    if (centerX < radius || centerX > 2000-radius) {
        props.moveBack_shakeHorizontal();
    }

    useEffect(() => {
        var canvas = document.getElementById(id);
        var context = canvas.getContext("2d");
        canvas.width = 2000;
        canvas.height = 2000;

        function drawCircle(centerX, centerY, radius, fillColour, borderColour, borderWidth) {
            context.clearRect(0, 0, canvas.width, canvas.height)
            context.beginPath();
            context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
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

        drawCircle(centerX, centerY, radius, fillColour, borderColour, borderWidth);
        if (anchorDot) shapesFunctions.drawAnchorDot(context, anchor[0], anchor[1], size/20, 'white', 'white', borderWidth);
    }, [position]);

    return (
        <div className={shapeClassName}>
            <canvas id={id}></canvas>
        </div>
    );
}

export { Circle }