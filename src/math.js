// generate grid with a loop
const mathFunctions = {
    createGridObject: () => {
        const grid ={};

        for (let x = -10; x <= 10; x++) {
            grid[x] = {};
            for (let y = -10; y <= 10; y++) {
                grid[x][y] = false;
            }
            //     console.log("hi");
        }
    // console.log(grid,'grid')
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

    rotation: (x,y, clockwise, centre) => {
        // to do 
        let endX;
        let endY;
        return [endX, endY];
    },

    transformGrid: (grid, x, y, callback, parameters) => {
        let [endX, endY] = callback(x, y, ...parameters);
        grid[endX][endY] = true;
        grid[x][y] = false;
    }
}


export default mathFunctions;