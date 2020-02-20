import React, { useEffect } from "react";
import css from "./shapeComp.module.css";

function Triangle(props) {
  // postion is array of anchorX, anchorY, length
  let {
    id,
    position,
    fillColour,
    borderColour,
    borderWidth,
    shapeClassName
  } = props.shapeInfo; //props.circleInfo -> props.shapeInfo
  let [anchorX, anchorY, size, orientation] = position;
  let length1 = size * 2;
  let length2 = 400;

  useEffect(() => {
    var canvas = document.getElementById(id);
    var context = canvas.getContext("2d");
    canvas.width = 2000;
    canvas.height = 2000;
    let cornerArray = determineCorners(
      anchorX,
      anchorY,
      length1,
      length2,
      orientation
    );

    function drawTriangle(fillColour, borderColour, borderWidth) {
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.beginPath();
      context.moveTo(cornerArray[0][0], cornerArray[0][1]);
      context.lineTo(cornerArray[1][0], cornerArray[1][1]);
      context.lineTo(cornerArray[2][0], cornerArray[2][1]);
      context.moveTo(cornerArray[0][0], cornerArray[0][1]);
      context.fillStyle = fillColour;
      context.fill();

      context.lineWidth = borderWidth;
      context.strokeStyle = borderColour;
      context.stroke();
    }

    drawTriangle(fillColour, borderColour, borderWidth);
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
