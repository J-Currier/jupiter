import React, { useEffect } from 'react';
import './shapeComp.css';
import shapesFunctions from "./shapesFunctions.js";

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
    let anchorDotSize = props.anchorDotSize;
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

        drawRectangle(fillColour, borderColour, borderWidth);
        if (anchorDotSize) shapesFunctions.drawAnchorDot(context, anchorX, anchorY, anchorDotSize, 'white', 'white', borderWidth);
    }, [position]);

    return (
        <div className={shapeClassName}>
            <canvas id={id}></canvas>
        </div>
    );
}

function determineCorners(anchorX, anchorY, length, orientation) {
    if (orientation === 1) {
      return [[anchorX, anchorY], [anchorX + 2 * length, anchorY], [anchorX + 2 * length, anchorY - length], [anchorX, anchorY - length]];
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

export { Rectangle, determineCorners }
