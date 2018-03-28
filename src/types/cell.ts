class Cell {
    x: number;
    y: number;
    visited: boolean;
    northWall: boolean;
    eastWall: boolean;
    southWall: boolean;
    westWall: boolean;
    
    constructor(column: number, row: number){
        this.x = column;
        this.y = row;
        this.visited = false;
        this.northWall = true;
        this.eastWall = true;
        this.southWall = true;
        this.westWall = true;
    }
}