import React, { useEffect } from 'react';
import './circleComp.css';

function Circle(props) {
    let {centerX, centerY, radius, fillColour, borderColour, borderWidth, shapeClassName} = props.circleInfo
    useEffect(() => {
        var canvas = document.getElementById("myCircle");
        var context = canvas.getContext("2d");
        canvas.width = 2000;
        canvas.height = 2000;

        function drawCircle(centerX, centerY, radius, fillColour, borderColor, borderWidth) {
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
    });

    return (
      <div className={shapeClassName}>
          <canvas id="myCircle"></canvas>
      </div>
    );
}

function EndPtCircle(props) {
    let {endPtX, endPtY, radius, fillColour, borderColour, borderWidth, shapeClassName} = props.circleInfo
    useEffect(() => {
        var canvas = document.getElementById("myCircle");
        var context = canvas.getContext("2d");
        canvas.width = 2000;
        canvas.height = 2000;

        function drawCircle(endPtX, endPtY, radius, fillColour, borderColor, borderWidth) {
            context.clearRect(0, 0, canvas.width, canvas.height)
            context.beginPath();
            context.arc(endPtX, endPtY, radius, 0, 2 * Math.PI, false);
            context.fillStyle = fillColour;
            context.fill();
            context.lineWidth = borderWidth;
            context.strokeStyle = borderColour;
            context.stroke();
        }
        
        drawCircle(endPtX, endPtY, radius, fillColour, borderColour, borderWidth); 
    });

    return (
      <div className={shapeClassName}>
          <canvas id="myCircle"></canvas>
      </div>
    );
}

export {Circle, EndPtCircle}