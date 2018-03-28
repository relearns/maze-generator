var Maze = /** @class */ (function () {
    function Maze(width, height) {
        this.cells = [];
        for (var i = 0; i < width; i++) {
            this.cells[i] = [];
            for (var j = 0; j < height; j++) {
                this.cells[i][j] = new Cell(i, j);
            }
        }
        this.visitedCount = 0;
        this.current = null;
    }
    return Maze;
}());
