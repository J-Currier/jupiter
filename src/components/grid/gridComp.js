import React, { useEffect } from 'react';
import './gridComp.css';

function Grid(props) {
    useEffect(() => {
        var canvas = document.getElementById("myGrid");
        var context = canvas.getContext("2d");
        canvas.width = 2000;
        canvas.height = 2000;
        var bw = canvas.width;
        var bh = canvas.height;

        function drawBoard(context = document.getElementById("myGrid").getContext("2d")){
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

        function axesNumbers() {
            // context.font = "65px Calibri bold";
            context.font=`65px '${props.font}'`
            // context.font = "65px 'M PLUS Rounded 1c'";
            context.fillStyle = "white";
            for (var x = 100; x <= 900; x += 100) {
                if (x !==1000) context.fillText(`${(x/100)-10}`, x-15, 980);
            }
            for (var x = 1100; x <= 1900; x += 100) {
                if (x !==1000) context.fillText(`${(x/100)-10}`, x+10, 1060);
            }
            for (var y = 100; y <= 900; y += 100) {
                if (y !==1000) context.fillText(`${10-(y/100)}`, 1020, y+15);
            }
            for (var y = 1100; y <= 1900; y += 100) {
                if (y !==1000) context.fillText(`${10-(y/100)}`, 925, y+15);
            }
        }
        
        drawBoard();    
        drawAxis();
        axesNumbers();  
    }, []);
    return (
      <div className="grid">
          <canvas id="myGrid"></canvas>
      </div>
    );
}

export {Grid}