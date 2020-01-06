// generate grid with a loop
const mathFunctions = {
    createGridObject: () => {
        const grid ={};

        for (let y = -10; y <= 10; y++) {
            grid[y] = {};
            for (let x = -10; x <= 10; x++) {
                grid[y][x] = 'value';
            }
            //     console.log("hi");
        }
    console.log(grid,'grid')
    }
}


export default mathFunctions;