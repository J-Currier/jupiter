import React, { useEffect } from 'react';
import css from './shapeComp.module.css';

function determineCorners(x, y, d, orientation) {
    const orientations = {
        1: [[x, y], [x + 2 * d, y], [x + 2 * d, y - d], [x, y - d]],
        2: [[x, y], [x + d, y], [x + d, y + 2 * d], [x, y + 2 * d]],
        3: [[x, y], [x - 2 * d, y], [x - 2 * d, y + d], [x, y + d]],
        4: [[x, y], [x - d, y], [x - d, y - 2 * d], [x, y - 2 * d]]
    };
    return orientations[orientation]
};


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

    size = Math.round(size/2);

    let cornerArray = determineCorners(anchorX, anchorY, size, orientaion);

    if (cornerArray[0][1] < 0 || cornerArray[0][1] > 2000 ||
        cornerArray[1][1] < 0 || cornerArray[1][1] > 2000 ||
        cornerArray[2][1] < 0 || cornerArray[2][1] > 2000 ||
        cornerArray[3][1] < 0 || cornerArray[3][1] > 2000) {
        props.moveBack_shakeVertical();
    }
    if (cornerArray[0][0] < 0 || cornerArray[0][0] > 2000 ||
        cornerArray[1][0] < 0 || cornerArray[1][0] > 2000 ||
        cornerArray[2][0] < 0 || cornerArray[2][0] > 2000 ||
        cornerArray[3][0] < 0 || cornerArray[3][0] > 2000) {
        props.moveBack_shakeHorizontal();
    }
    useEffect(() => {
        var canvas = document.getElementById(id);
        var context = canvas.getContext("2d");
        canvas.width = 2000;
        canvas.height = 2000;
        let myArr = [['t', [400, 0]], ['t', [0, 100]], ['r', [90, 1000, 1000]]];
        // let myArr = [1,2,3];
        console.log('in use effect');


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

        // context.translate(-300, -200);
        if( shapeClassName !== 'endPtCircle') {
            

            console.log(myArr);
                let xReflec = false;
                let yReflect = false;
                let xFactor = 1
                let yFactor = 1
                let xMag = 0;
                let yMag =0;

            
                console.log('if statement');
                for (let item of myArr) {
                    console.log(item[1][0])
                    if(item[0] == 't') {
                        context.translate((item[1][0]*xFactor), (item[1][1]*yFactor));
                        xMag = ((item[1][0]*xFactor) + xMag);
                        yMag = ((item[1][1]*yFactor) + yMag)
                        console.log('xmag', xMag);
                        console.log('ymag', yMag);
                        
                    }
                    if(item[0] == 'r') {
                        console.log('rotate');
                        console.log(item[1][0]*Math.PI/180)
                        context.beginPath();
                        context.translate(((item[1][1]*xFactor)-xMag),((item[1][2]*yFactor)+yMag));
                        context.rotate(item[1][0]*Math.PI/180);
                        context.translate((-(item[1][1]*xFactor)+xMag),(-(item[1][2]*yFactor)+yMag))
                    }
                    if(item[0] == 'f') {  
                        console.log('reflection');
                        context.translate((item[1][0]*xFactor), (item[1][1]*yFactor));
                        context.scale(item[2][0], item[2][1]);
                        context.translate((-item[1][0]*xFactor), (-item[1][1]*yFactor));
                        if (item[2][0] == -1) {
                            xReflec = !xReflec;
                            xFactor = xFactor*-1;
                        };
                        if (item[2][1] == -1) {
                            yReflect = !yReflect;
                            yFactor = yFactor*-1;

                        };
                    } 
                }

            }
            // for (i in myArr, i<myArr.length,  i++) {
            //     if(myArr[i][0] == 't') {
            //         context.translate(myArr[i][1][0], myArr[i][1][1] )
            //     }
            // }
        drawRectangle(fillColour, borderColour, borderWidth);
    }, [position]);

    return (
        <div className={shapeClassName}>
            <canvas id={id}></canvas>
        </div>
    );
}

export { Rectangle, determineCorners }
