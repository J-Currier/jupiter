import React, { useEffect } from 'react';
import './canvasComp.css';
import mathFunctions from './math.js'

function Canvas() {
    useEffect(() => {
        // ctx.moveTo(1000, 0);
        // ctx.lineTo(1000, 2000);
        // ctx.stroke();
        // Box width
        // Box height


        var canvas = document.getElementById("myCanvas");
        var context = canvas.getContext("2d");
        canvas.width = 2000;
        canvas.height = 2000;
        var bw = canvas.width;
        var bh = canvas.height;

        function drawBoard(){
            for (var x = 0; x <= bw; x += 100) {
                context.lineWidth = 8;
                context.moveTo(x, 0);
                context.lineTo(x, bh);
            }

            for (var y = 0; y <= bh; y += 100) {
                context.moveTo(0, y);
                context.lineTo(bw, y);
            }
            context.strokeStyle = "black" ;
            context.stroke();
        }

        

        function drawAxis(){
            console.log('red line')
                context.beginPath();
                context.strokeStyle = 'red';
                context.lineWidth = 10;
                context.moveTo(1000, 0);
                context.lineTo(1000, 2000);
                context.stroke();

                context.beginPath();
                context.strokeStyle = 'red';
                context.lineWidth = 10;
                context.moveTo(0, 1000);
                context.lineTo(2000, 1000);
                context.stroke();

        }

    function drawCircle(centerX, centerY, myColour) {
    //   var centerX = 1100;
    //   var centerY = 900 ;
      var radius = 50;

      context.beginPath();
      context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
      context.fillStyle = myColour;
      context.fill();
      context.lineWidth = 20;
      context.strokeStyle = '#003300';
      context.stroke();
    }
        
            drawBoard();    
            drawAxis();   
            drawCircle(1100, 900, 'green'); 
            // drawCircle( ...mathFunctions.translate (1100, 900, 100, 0), 'red');

    });



    return (
      <div className="Canvas">
          <canvas id="myCanvas"></canvas>
      </div>
    );
}

export {Canvas}