import React, { useEffect } from 'react';
import './gridComp.css';

function Grid() {
    useEffect(() => {
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
        
        drawBoard();    
        drawAxis();   
    });

    return (
      <div className="Canvas">
          <canvas id="myCanvas"></canvas>
      </div>
    );
}

export {Grid}