import {Square, determineCorners} from "./squareComp.js";

// test('divClick', () => {
//     expect(functions.divClickFunction(0)).toBe(0);

// });

test('determine corners function', () => {
    expect(determineCorners(1000, 1000, 200, 1)).toEqual([[1000, 1000],[1200, 1000],[1200, 800],[1000, 800]]);
});