
const mathFunctions = {
    shapeMaker: (size) => {
        let anchorX = 0
        while(anchorX < size || anchorX > 2000-size ) {
            anchorX = (Math.floor(Math.random()*19)+1)*100
        }
        let anchorY = 0
        while(anchorY < size || anchorY > 2000-size ) {
            anchorY = (Math.floor(Math.random()*19)+1)*100
        }
        return [anchorX, anchorY]
    },

    // createGridObject: () => {
    //     const grid ={};
    //     for (let x = -10; x <= 10; x++) {
    //         grid[x] = {};
    //         for (let y = -10; y <= 10; y++) {
    //             grid[x][y] = false;
    //         }
    //     }
    // return grid
    // },

    translate: (x, y, deltaX, deltaY) => {
        let endX = x + deltaX;
        let endY = y + deltaY;
        return [endX, endY]
    },

    reflect: (position, lineOfReflection) => {
        let [anchorX, anchorY, , orientation] = position; // size skipped
        let [xRef, yRef, value] = lineOfReflection; //xRef and yRef= bool
        if (xRef ) {
            value = value * 100 + 1000;
            orientation = orientation * -1;
            anchorX = value - ( anchorX - value);
        }
        if (yRef) {
            value = value * -100 + 1000;
            orientation = ((orientation + 2) % 4) * -1;
            anchorY = value - ( anchorY - value);
        }
        
        return [anchorX, anchorY, orientation];
    },

    rotate: (playerPosition, magnitude, pivotPointx, pivotPointy, direction) => {
        let [anchorX, anchorY, size, orientation] = playerPosition;
        pivotPointx = pivotPointx*100 + 1000;
        pivotPointy = -pivotPointy*100 + 1000;
        console.log(playerPosition, magnitude, pivotPointx, pivotPointy, direction)
        if ((magnitude === 90 && direction)||(magnitude === 270 && !direction)) {
            let cornerX = anchorX;
            let cornerY = anchorY;
            anchorX = pivotPointx + cornerY - pivotPointy;
            anchorY = pivotPointy - cornerX + pivotPointx;
            if (orientation > 0) {
                orientation = orientation + 1;
                if (orientation > 4) orientation = orientation - 4
            } 
            if (orientation < 0) {
                orientation = orientation + 1;
                if (orientation >= 0) orientation = orientation - 4
            }
        }
        if ((magnitude === 180 && direction)||(magnitude === 180 && !direction)) {
            let cornerX = anchorX;
            let cornerY = anchorY;
            anchorX = 2 * pivotPointx - cornerX;
            anchorY = 2 * pivotPointy - cornerY;
            if (orientation > 0) {
                orientation = orientation + 2;
                if (orientation > 4) orientation = orientation - 4
            } 
            if (orientation < 0) {
                orientation = orientation + 2;
                if (orientation >= 0) orientation = orientation - 4
            }
        }
        if ((magnitude === 270 && direction)||(magnitude === 90 && !direction)) {
            let cornerX = anchorX;
            let cornerY = anchorY;
            anchorX = pivotPointy - cornerY + pivotPointx;
            anchorY = cornerX - pivotPointx + pivotPointy;
            if (orientation > 0) {
                orientation = orientation + 3;
                if (orientation > 4) orientation = orientation - 4
            } 
            if (orientation < 0) {
                orientation = orientation + 3;
                if (orientation >= 0) orientation = orientation - 4
            }
        }
        console.log(anchorX, anchorY, size, orientation)
        return([anchorX, anchorY, size, orientation])
    },

    // rotate: (magnitude, direction, pointOfRotation, playerPosition) => { //direction true = ccw
    //     let flipFactor = 1;
    //     playerPosition[0] = (playerPosition[0] - 1000) /100;
    //     playerPosition[1] = (1000 - playerPosition[1]) /100;
    //     let deltaX = playerPosition[0] - pointOfRotation[0];
    //     let deltaY = playerPosition[1] - pointOfRotation[1];
    //     let newDirection = direction;
    //     let tempX;

    //     if (playerPosition[3] < 0) {
    //         playerPosition[3] = playerPosition[3] * -1;
    //         newDirection = !direction;
    //         flipFactor = -1;
    //     }
    //     let newOrientation;
    //     if (newDirection) {
    //         newOrientation = ((playerPosition[3] + magnitude/90) % 4) *flipFactor;
            
    //     }
    //     if (!newDirection ) {
    //         newOrientation = ((playerPosition[3] + (4 - (magnitude/90))) %4) * flipFactor;
    //     }
    //     if (direction) {
    //         for (let i = 0; i < (magnitude/90); i++) {
    //             tempX = deltaY * -1;
    //             deltaY = deltaX;
    //             deltaX = tempX;
    //         }
    //     }
    //     if (!direction) {
    //         for (let i = 0; i < (magnitude/90); i++) {
    //             tempX = deltaY;
    //             deltaY = deltaX * -1;
    //             deltaX = tempX;
    //         }
    //     }
    //     if (newOrientation === 0){
    //         newOrientation = 4*flipFactor;
    //     }
    //     let newAnchorX = (pointOfRotation[0] + deltaX) * 100 + 1000;
    //     let newAnchorY = 1000 - ((pointOfRotation[1] + deltaY) * 100);
    //     console.log([newAnchorX, newAnchorY, newOrientation])

    //     return ([newAnchorX, newAnchorY, newOrientation]);
    // },

    // transformGrid: (grid, x, y, callback, parameters) => {
    //     let [endX, endY] = callback(x, y, ...parameters);
    //     grid[endX][endY] = true;
    //     grid[x][y] = false;
    // }
}


export default mathFunctions;