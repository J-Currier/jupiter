import mathFunctions from './math'

// test('math grid', () => {
//     const grid = mathFunctions.createGridObject();
//     expect(grid[-5][5]).toEqual(false);
//     expect(grid[-11]).toEqual(undefined);
//     expect(grid[0][-11]).toEqual(undefined);
//     expect(Object.values(grid).length).toBe(21);
// });

test('math translate', () => {
    expect(mathFunctions.translate(-5, 5, 2, 2)).toEqual([-3, 7])
});

test('math reflect', () => {
    expect(mathFunctions.reflect([0, 0, 2, 1],[true, false, 0])).toEqual([0, 0, -1]);
    expect(mathFunctions.reflect([0, 0, 2, 1],[false, true, 0])).toEqual([0, 0, -3]);
    expect(mathFunctions.reflect([-4, 0, 2, -3],[true, false, -2])).toEqual([0, 0, 3]);
    expect(mathFunctions.reflect([0, -2, 2, -4],[false, true, -3])).toEqual([0, -4, 2]);
});

test('math rotate', () => {
    expect(mathFunctions.rotate(90, true, [0,0], [3,2,2,1])).toEqual([-2, 3, 2]);
    expect(mathFunctions.rotate(270, true, [0,0], [3,2,2,-1])).toEqual([2, -3, -2]);
    expect(mathFunctions.rotate(270, true, [0,0], [3,2,2,4])).toEqual([2, -3, 3]);
    expect(mathFunctions.rotate(270, true, [0,0], [3,2,2,-4])).toEqual([2, -3, -1]);
    expect(mathFunctions.rotate(90, false, [0,0], [3,2,2,1])).toEqual([2, -3, 4]);
    expect(mathFunctions.rotate(270, false, [0,0], [3,2,2,-1])).toEqual([-2, 3, -4]);
    expect(mathFunctions.rotate(270, false, [0,0], [3,2,2,4])).toEqual([-2, 3, 1]);
    expect(mathFunctions.rotate(270, false, [0,0], [3,2,2,-4])).toEqual([-2, 3, -3]);

});

// test('grid transform', () => {
//     const grid = mathFunctions.createGridObject();
//     mathFunctions.transformGrid(grid, -5, 5, mathFunctions.translate, [2, 2]);
//     expect(grid[-3][7]).toEqual(true);
//     expect(grid[-5][5]).toEqual(false);
// });