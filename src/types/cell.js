var Cell = /** @class */ (function () {
    function Cell(column, row) {
        this.x = column;
        this.y = row;
        this.visited = false;
        this.northWall = true;
        this.eastWall = true;
        this.southWall = true;
        this.westWall = true;
    }
    return Cell;
}());
