import { Cell } from "./cell";

export class Maze {
    public cells: Cell[][];
    public current: Cell;
    public visitedCount: number;

    constructor(width: number, height: number) {
        this.cells = [];
        for (let i: number = 0; i < width; i++) {
            this.cells[i] = [];
            for (let j: number = 0; j < height; j++) {
                this.cells[i][j] = new Cell(i, j);
            }
        }
        this.visitedCount = 0;
    }
}
