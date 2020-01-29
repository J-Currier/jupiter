import React, { useEffect } from 'react';
import './circleComp.css';

function Circle(props) {
    let {id, centerX, centerY, radius, fillColour, borderColour, borderWidth, shapeClassName} = props.circleInfo
    useEffect(() => {
        var canvas = document.getElementById(id);
        console.log(canvas, id, centerX, centerY, radius, fillColour, borderColour, borderWidth, shapeClassName)
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
    }, [centerX, centerY]);
    
    return (
      <div className={shapeClassName}>
          <canvas id={id}></canvas>
      </div>
    );
}

export {Circle}