import mathFunctions from './math'

test('math grid', () => {
    const grid = mathFunctions.createGridObject();
    expect(grid[-5][5]).toEqual(false);
    expect(grid[-11]).toEqual(undefined);
    expect(grid[0][-11]).toEqual(undefined);
    expect(Object.values(grid).length).toBe(21);
});

test('grid translate', () => {
    const grid = mathFunctions.createGridObject()
    expect(mathFunctions.translate(-5, 5, 2, 2)).toEqual([-3, 7])
});

test('grid translate', () => {
    const grid = mathFunctions.createGridObject();
    mathFunctions.transformGrid(grid, -5, 5, 2, 2);
    expect(grid[-3][7]).toEqual(true);
    expect(grid[-5][5]).toEqual(false);
});