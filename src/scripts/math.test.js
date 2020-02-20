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
    expect(mathFunctions.reflect(-5, 5, true, 0)).toEqual([5, 5]);
    expect(mathFunctions.reflect(-5, 5, true, 2)).toEqual([9, 5]);
    expect(mathFunctions.reflect(5, 0, true, 2)).toEqual([-1, 0]);
    expect(mathFunctions.reflect(2, 2, false, 0)).toEqual([2, -2]);
    expect(mathFunctions.reflect(2, 2, false, -3)).toEqual([2, -8]);
    expect(mathFunctions.reflect(0, -3, false, 1)).toEqual([0, 5]);
    expect(mathFunctions.reflect(0, -3, false, -3)).toEqual([0, -3]);
});

test('math rotate', () => {
    expect(mathFunctions.rotate(0,0, 0, 90)).toEqual([-1,1]);
});

test('grid transform', () => {
    const grid = mathFunctions.createGridObject();
    mathFunctions.transformGrid(grid, -5, 5, mathFunctions.translate, [2, 2]);
    expect(grid[-3][7]).toEqual(true);
    expect(grid[-5][5]).toEqual(false);
});