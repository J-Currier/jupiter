import mathFunctions from './math'

test('math grid', () => {
    const grid = mathFunctions.createGridObject();
    expect(grid[-5][5]).toEqual(false);
    expect(grid[-11]).toEqual(undefined);
    expect(grid[0][-11]).toEqual(undefined);
    expect(Object.values(grid).length).toBe(21);
});

test('math translate', () => {
    expect(mathFunctions.translate(-5, 5, 2, 2)).toEqual([-3, 7])
});

test('math reflect', () => {
    expect(mathFunctions.reflect([0, 0, 2, 1],[true, false, 0])).toEqual([0, 0, 2, -1]);
    expect(mathFunctions.reflect([0, 0, 2, 1],[false, true, 0])).toEqual([0, 0, 2, -3]);
    expect(mathFunctions.reflect([-4, 0, 2, -3],[true, false, -2])).toEqual([0, 0, 2, 3]);
    expect(mathFunctions.reflect([0, -2, 2, -4],[false, true, -3])).toEqual([0, -4, 2, 2]);
});

// test('math rotate', () => {
//     expect(mathFunctions.rotate(-1,-1, true, 0)).toEqual([-1,1]);
// });

test('grid transform', () => {
    const grid = mathFunctions.createGridObject();
    mathFunctions.transformGrid(grid, -5, 5, mathFunctions.translate, [2, 2]);
    expect(grid[-3][7]).toEqual(true);
    expect(grid[-5][5]).toEqual(false);
});