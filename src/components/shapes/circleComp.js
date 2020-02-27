import React, { useEffect } from 'react';
import './shapeComp.css';
import shapesFunctions from "./shapesFunctions.js";

function Circle(props) {
    let {
        id,
        position,
        fillColour,
        borderColour,
        borderWidth,
        shapeClassName
    } = props.shapeInfo;
    let [anchorX, anchorY, size, orientaion] = position;
    let anchorDotSize = props.anchorDotSize;
    let radius = size/2;
    let corner = determineCorners(anchorX, anchorY, radius, orientaion)[0];
    
    if (anchorY < radius || anchorY > 2000-radius) {
        props.moveBack_shakeVertical();
    }
    if (anchorX < radius || anchorX > 2000-radius) {
        props.moveBack_shakeHorizontal();
    }

    useEffect(() => {
        var canvas = document.getElementById(id);
        console.log(canvas.clientWidth)
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

        drawCircle(anchorX, anchorY, radius, fillColour, borderColour, borderWidth);
        if (anchorDotSize) shapesFunctions.drawAnchorDot(context, corner[0], corner[1], anchorDotSize, 'white', 'white', borderWidth);
    }, [position]);

    return (
        <div className={shapeClassName}>
            <canvas id={id}></canvas>
        </div>
    );
}

function determineCorners(anchorX, anchorY, length, orientation) {
    if (orientation === 1) {
      return [[anchorX+length, anchorY]];
    }
    if (orientation === 2) {
      let helper = determineCorners(anchorX, anchorY, length, 1)
      for (let corner of helper) {
        let cornerX = corner[0];
        let cornerY = corner[1];
        corner[0] = anchorX + cornerY - anchorY;
        corner[1] = anchorY - cornerX + anchorX;
      }
      return helper;
    }
  
    if (orientation === 3) {
      let helper = determineCorners(anchorX, anchorY, length, 1)
      for (let corner of helper) {
        let cornerX = corner[0];
        let cornerY = corner[1];
        corner[0] = 2 * anchorX - cornerX;
        corner[1] = 2 * anchorY - cornerY;
      }
      return helper;
    }
    if (orientation === 4) {
      let helper = determineCorners(anchorX, anchorY, length, 1)
      for (let corner of helper) {
        let cornerX = corner[0];
        let cornerY = corner[1];
        corner[0] = anchorY - cornerY + anchorX;
        corner[1] = cornerX - anchorX + anchorY;
      }
      return helper;
    }
    if (orientation === (-1)) {
      let helper = determineCorners(anchorX, anchorY, length, 1)
      for (let corner of helper) {
        corner[0] = corner[0] - 2*(corner[0]-anchorX)
      }
      return helper;
    }
    if (orientation === (-2)) {
      let helper = determineCorners(anchorX, anchorY, length, 2)
      for (let corner of helper) {
        corner[0] = corner[0] - 2*(corner[0]-anchorX)
      }
      return helper;
    }
    if (orientation === (-3)) {
      let helper = determineCorners(anchorX, anchorY, length, 3)
      for (let corner of helper) {
        corner[0] = corner[0] - 2*(corner[0]-anchorX)
      }
      return helper;
    }
    if (orientation === (-4)) {
      let helper = determineCorners(anchorX, anchorY, length, 4)
      for (let corner of helper) {
        corner[0] = corner[0] - 2*(corner[0]-anchorX)
      }
      return helper;
    }
}
export { Circle }