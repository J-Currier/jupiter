import React, { useEffect } from "react";
import "./shapeComp.css";
import shapesFunctions from "./shapesFunctions.js";

function Star(props) {
  let {
    id,
    position,
    fillColour,
    borderColour,
    borderWidth,
    shapeClassName
  } = props.shapeInfo;
  let [anchorX, anchorY, size, orientation] = position;
  let anchorDotSize = props.anchorDotSize;
  
  let cornerArray = determineCorners(anchorX, anchorY, size, orientation);

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


    function drawStar(fillColour, borderColour, borderWidth) {
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.beginPath();
      context.moveTo(cornerArray[0][0], cornerArray[0][1]);
      context.lineTo(cornerArray[1][0], cornerArray[1][1]);
      context.lineTo(cornerArray[2][0], cornerArray[2][1]);
      context.lineTo(cornerArray[3][0], cornerArray[3][1]);
      context.lineTo(cornerArray[4][0], cornerArray[4][1]);
      context.lineTo(cornerArray[5][0], cornerArray[5][1]);
      context.lineTo(cornerArray[6][0], cornerArray[6][1]);
      context.lineTo(cornerArray[7][0], cornerArray[7][1]);
      context.lineTo(cornerArray[8][0], cornerArray[8][1]);
      context.lineTo(cornerArray[9][0], cornerArray[9][1]);
      context.lineTo(cornerArray[0][0], cornerArray[0][1]);

      context.fillStyle = fillColour;
      context.fill();
      context.lineWidth = borderWidth;
      context.strokeStyle = borderColour;
      context.stroke();
    }
    
    drawStar(fillColour, borderColour, borderWidth);
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
    return [
      [anchorX, anchorY],
      [anchorX + (length/525)*175, anchorY - (length/525)*125],
      [anchorX + (length/525)*375, anchorY],
      [anchorX + (length/525)*300, anchorY - (length/525)*200],
      [anchorX + (length/525)*425, anchorY - (length/525)*350],
      [anchorX + (length/525)*250, anchorY - (length/525)*350],
      [anchorX + (length/525)*175, anchorY - (length/525)*525],
      [anchorX + (length/525)*100, anchorY - (length/525)*350],
      [anchorX - (length/525)*75, anchorY - (length/525)*350],
      [anchorX + (length/525)*50, anchorY - (length/525)*200]
    ];
  }
  if (orientation === 2) {
    return [
      [anchorX, anchorY],
      [anchorX + (length/525)*125, anchorY + (length/525)*175],
      [anchorX, anchorY + (length/525)*375],
      [anchorX + (length/525)*200, anchorY + (length/525)*300],
      [anchorX + (length/525)*350, anchorY + (length/525)*425],
      [anchorX + (length/525)*350, anchorY + (length/525)*250],
      [anchorX + (length/525)*525, anchorY + (length/525)*175],
      [anchorX + (length/525)*350, anchorY + (length/525)*100],
      [anchorX + (length/525)*350, anchorY - (length/525)*75],
      [anchorX + (length/525)*200, anchorY + (length/525)*50]
    ];
  }
  if (orientation === 3) {
    return [
      [anchorX, anchorY],
      [anchorX - (length/525)*175, anchorY + (length/525)*125],
      [anchorX - (length/525)*375, anchorY],
      [anchorX - (length/525)*300, anchorY + (length/525)*200],
      [anchorX - (length/525)*425, anchorY + (length/525)*350],
      [anchorX - (length/525)*250, anchorY + (length/525)*350],
      [anchorX - (length/525)*175, anchorY + (length/525)*525],
      [anchorX - (length/525)*100, anchorY + (length/525)*350],
      [anchorX + (length/525)*75, anchorY + (length/525)*350],
      [anchorX - (length/525)*50, anchorY + (length/525)*200]
    ];
  }
  if (orientation === 4) {
    return [
      [anchorX, anchorY],
      [anchorX - (length/525)*125, anchorY - (length/525)*175],
      [anchorX, anchorY - (length/525)*375],
      [anchorX - (length/525)*200, anchorY - (length/525)*300],
      [anchorX - (length/525)*350, anchorY - (length/525)*425],
      [anchorX - (length/525)*350, anchorY - (length/525)*250],
      [anchorX - (length/525)*525, anchorY - (length/525)*175],
      [anchorX - (length/525)*350, anchorY - (length/525)*100],
      [anchorX - (length/525)*350, anchorY + (length/525)*75],
      [anchorX - (length/525)*200, anchorY - (length/525)*50]
    ];
  }
}

export { Star, determineCorners };
