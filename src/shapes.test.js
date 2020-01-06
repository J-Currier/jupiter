import Line from './shapes';

test('', () => {
    let line = new Line([0,0], [5,0]);
    expect(line.points).toEqual([
        [0,0],
        [1,0],
        [2,0],
        [3,0],
        [4,0],
        [5,0]
    ]);

});