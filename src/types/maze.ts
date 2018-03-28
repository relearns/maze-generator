class Maze {
    cells: Cell[][];
    current: Cell;
    visitedCount: number;

    constructor(width: number, height: number){
        this.cells = [];
        for(var i: number = 0; i < width; i++) {
            this.cells[i] = [];
            for(var j: number = 0; j < height; j++){
                this.cells[i][j] = new Cell(i, j);
            }
        }
        this.visitedCount = 0;
        this.current = null;
    }
}