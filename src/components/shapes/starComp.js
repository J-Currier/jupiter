import React, { useEffect } from "react";
import "./shapeComp.css";

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

  useEffect(() => {
    var canvas = document.getElementById(id);
    var context = canvas.getContext("2d");
    canvas.width = 2000;
    canvas.height = 2000;

    let cornerArray = determineCorners(anchorX, anchorY, size, orientation);

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
      [anchorX + 175, anchorY - 125],
      [anchorX + 375, anchorY],
      [anchorX + 300, anchorY - 200],
      [anchorX + 425, anchorY - 350],
      [anchorX + 250, anchorY - 350],
      [anchorX + 175, anchorY - 525],
      [anchorX + 100, anchorY - 350],
      [anchorX - 75, anchorY - 350],
      [anchorX + 50, anchorY - 200]
    ];
  }
  if (orientation === 2) {
    return [
      [anchorX, anchorY],
      [anchorX + 125, anchorY + 175],
      [anchorX, anchorY + 375],
      [anchorX + 200, anchorY + 300],
      [anchorX + 350, anchorY + 425],
      [anchorX + 350, anchorY + 250],
      [anchorX + 525, anchorY + 175],
      [anchorX + 350, anchorY + 100],
      [anchorX + 350, anchorY - 75],
      [anchorX + 200, anchorY + 50]
    ];
  }
  if (orientation === 3) {
    return [
      [anchorX, anchorY],
      [anchorX - 175, anchorY + 125],
      [anchorX - 375, anchorY],
      [anchorX - 300, anchorY + 200],
      [anchorX - 425, anchorY + 350],
      [anchorX - 250, anchorY + 350],
      [anchorX - 175, anchorY + 525],
      [anchorX - 100, anchorY + 350],
      [anchorX + 75, anchorY + 350],
      [anchorX - 50, anchorY + 200]
    ];
  }
  if (orientation === 4) {
    return [
      [anchorX, anchorY],
      [anchorX - 125, anchorY - 175],
      [anchorX, anchorY - 375],
      [anchorX - 200, anchorY - 300],
      [anchorX - 350, anchorY - 425],
      [anchorX - 350, anchorY - 250],
      [anchorX - 525, anchorY - 175],
      [anchorX - 350, anchorY - 100],
      [anchorX - 350, anchorY + 75],
      [anchorX - 200, anchorY - 50]
    ];
  }
}

export { Star, determineCorners };
