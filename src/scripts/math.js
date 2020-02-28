
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

    createGridObject: () => {
        const grid ={};
        for (let x = -10; x <= 10; x++) {
            grid[x] = {};
            for (let y = -10; y <= 10; y++) {
                grid[x][y] = false;
            }
        }
    return grid
    },

    translate: (x, y, deltaX, deltaY) => {
        let endX = x + deltaX;
        let endY = y + deltaY;
        return [endX, endY]
    },

    reflect: (position, lineOfReflection) => {
        let [anchorX, anchorY, size, orientation] = position;
        let [xRef, yRef, value] = lineOfReflection; //xRef and yRef= bool
        if (xRef ) {
            orientation = orientation * -1;
            anchorX = value - ( anchorX - value);
        }
        if (yRef != 0) {
            orientation = ((orientation + 2) % 4) * -1;
            anchorY = value - ( anchorY - value);
        }
        
        return [anchorX, anchorY, orientation];
    },

    rotate: (orientation, magnitude, direction) => { //direction true = ccw
        let flipFactor = 1
        if (orientation < 0) {
            orientation = orientation * -1;
            direction = !direction;
            flipFactor = -1;
        }
        let newOrientation;
        if (direction ) {
            newOrientation = ((orientation + magnitude/90) % 4) *flipFactor;
        }
        if (!direction ) {
            newOrientation = ((orientation + (4 - (magnitude/90))) %4) * flipFactor;
        }
        if (newOrientation === 0){
            newOrientation = 4*flipFactor;
        }
        return (newOrientation);
    },

    transformGrid: (grid, x, y, callback, parameters) => {
        let [endX, endY] = callback(x, y, ...parameters);
        grid[endX][endY] = true;
        grid[x][y] = false;
    }
}


export default mathFunctions;