export class Cell {
    public x: number;
    public y: number;
    public visited: boolean;
    public northWall: boolean;
    public eastWall: boolean;
    public southWall: boolean;
    public westWall: boolean;
    constructor(column: number, row: number) {
        this.x = column;
        this.y = row;
        this.visited = false;
        this.northWall = true;
        this.eastWall = true;
        this.southWall = true;
        this.westWall = true;
    }
}
