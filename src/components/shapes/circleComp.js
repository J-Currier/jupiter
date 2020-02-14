import React, { useEffect } from 'react';
import './shapeComp.css';

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
    // orientation unused in circle
    let radius = size / 2;
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

        drawCircle(centerX, centerY, radius, fillColour, borderColour, borderWidth);
    }, [position]);

    return (
        <div className={shapeClassName}>
            <canvas id={id}></canvas>
        </div>
    );
}

export { Circle }