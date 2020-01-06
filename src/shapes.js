class Line {
    constructor(start, end) {
        this.start = start;
        this.end = end;
        this.horizontal = true; // or vertical
        this.points = [];
        for (let x = start[0]; x <= end[0]; x++) {
            this.points.push([x,start[1]]);
        };
    }

}

export default Line;