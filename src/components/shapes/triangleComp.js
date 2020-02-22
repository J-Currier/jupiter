import React, { useEffect } from "react";
import "./shapeComp.css";

function Triangle(props) {
  let {
    id,
    position,
    fillColour,
    borderColour,
    borderWidth,
    shapeClassName
  } = props.shapeInfo;
  let [anchorX, anchorY, size, orientation] = position;
  let anchorDot = props.anchorDot;
  let length1 = size ;
  let length2 = size <=100 ? 100 : size/2;
  
  let cornerArray = determineCorners(
    anchorX,
    anchorY,
    length1,
    length2,
    orientation
  );

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

    function drawTriangle(fillColour, borderColour, borderWidth) {
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.beginPath();
      context.moveTo(cornerArray[0][0], cornerArray[0][1]);
      context.lineTo(cornerArray[1][0], cornerArray[1][1]);
      context.lineTo(cornerArray[2][0], cornerArray[2][1]);
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

    drawTriangle(fillColour, borderColour, borderWidth);
    if (anchorDot) drawAnchorDot(anchorX, anchorY, size/20, 'white', 'white', borderWidth);
  }, [anchorX, anchorY, size, orientation]);

  return (
    <div className={shapeClassName}>
      <canvas id={id}></canvas>
    </div>
  );
}

function determineCorners(x, y, d1, d2, orientation) {
  const orientations = {
    1: [
      [x, y],
      [x + d1, y],
      [x, y - d2]
    ],
    2: [
      [x, y],
      [x + d1, y],
      [x, y + d2]
    ],
    3: [
      [x, y],
      [x - d1, y],
      [x, y + d2]
    ],
    4: [
      [x, y],
      [x - d1, y],
      [x, y - d2]
    ],
    5: [
      [x, y],
      [x + d2, y],
      [x, y + d1]
    ],
    6: [
      [x, y],
      [x - d2, y],
      [x, y - d1]
    ]
  };
  return orientations[orientation];
}

export { Triangle, determineCorners };
