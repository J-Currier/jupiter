
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

    reflect: (x, y, horizontal, axis) => {
        let endX = x;
        let endY = y;
        if (horizontal) {
            endX = axis + (axis - x);
        } else {
            endY = axis + (axis - y);
        };
        return [endX, endY];
    },

    // rotate: (x,y, clockwise, centre) => {
    //     let endX;
    //     let endY;
    //     return [endX, endY];
    // },

    transformGrid: (grid, x, y, callback, parameters) => {
        let [endX, endY] = callback(x, y, ...parameters);
        grid[endX][endY] = true;
        grid[x][y] = false;
    }
}


export default mathFunctions;