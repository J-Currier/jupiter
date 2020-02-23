
const shapesFunctions = {
    drawAnchorDot: (context, centerX, centerY, radius, fillColour, borderColour, borderWidth) => {
        context.beginPath();
        context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
        context.fillStyle = fillColour;
        context.fill();
        context.lineWidth = borderWidth;
        context.strokeStyle = borderColour;
        context.stroke();
    },
}


export default shapesFunctions;