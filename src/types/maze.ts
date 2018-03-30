import { randFromInterval } from "../utilities/utilities";
import { Cell } from "./cell";

export class Maze {
    public cells: Cell[][];
    public current: Cell;
    public visitedCount: number;
    private width: number;
    private height: number;
    private stack: Cell[];
    private orderedStack: Cell[];
    private context: CanvasRenderingContext2D;
    private canvasWidth: number;
    private canvasHeight: number;
    private stepCount: number;
    constructor(width: number, height: number, context: CanvasRenderingContext2D) {
      this.cells = [];
      for (let i: number = 0; i < width; i++) {
        this.cells[i] = [];
        for (let j: number = 0; j < height; j++) {
          this.cells[i][j] = new Cell(i, j);
        }
      }
      this.context = context as CanvasRenderingContext2D;
      this.canvasWidth = context.canvas.width;
      this.canvasHeight = context.canvas.height;
      this.visitedCount = 0;
      this.stack = [];
      this.orderedStack = [];
      this.width = width;
      this.height = height;
      this.current = this.cells[0][0];
      this.current.visited = true;
      this.visitedCount = 1;
      this.stepCount = 0;
    }
    public generate() {
      const popThreshold = 2 * this.width;
      let countSincePop = 0;
      do {
        const candidates = this.getCandidates(this.current);
        if (candidates.length > 0 && countSincePop < popThreshold) {
          const next = candidates[randFromInterval(0, candidates.length - 1)];
          next.visited = true;
          this.visitedCount++;
          this.updateWalls(this.current, next);
          this.stack.push(this.current);
          this.orderedStack.push(this.current);
          this.current = next;
          countSincePop++;
        } else {
          this.current = this.stack.pop() as Cell;
          this.orderedStack.push(this.current);
          countSincePop = 0;
        }
      } while (this.visitedCount !== this.width * this.height);
    }
    public drawAll() {
      this.orderedStack.forEach((x) => this.drawCell(x));
    }
    public drawNext() {
      this.drawCell(this.orderedStack[this.stepCount]);
      this.stepCount++;
    }
    private drawCell(cell: Cell) {
      const cellWallLengthX = this.canvasWidth / this.width;
      const cellWallLengthY = this.canvasHeight / this.height;
      if (cell.northWall) {
        this.context.beginPath();
        this.context.moveTo(cell.x * cellWallLengthX, cell.y * cellWallLengthY);
        this.context.lineTo(cell.x * cellWallLengthX + cellWallLengthX, cell.y * cellWallLengthY);
        this.context.stroke();
      }
      if (cell.eastWall) {
        this.context.beginPath();
        this.context.moveTo(cell.x * cellWallLengthX + cellWallLengthX, cell.y * cellWallLengthY);
        this.context.lineTo(cell.x * cellWallLengthX + cellWallLengthX, cell.y * cellWallLengthY + cellWallLengthY);
        this.context.stroke();
      }
      if (cell.southWall) {
        this.context.beginPath();
        this.context.moveTo(cell.x * cellWallLengthX, cell.y * cellWallLengthY + cellWallLengthY);
        this.context.lineTo(cell.x * cellWallLengthX + cellWallLengthX, cell.y * cellWallLengthY + cellWallLengthY);
        this.context.stroke();
      }
      if (cell.westWall) {
        this.context.beginPath();
        this.context.moveTo(cell.x * cellWallLengthX, cell.y * cellWallLengthY);
        this.context.lineTo(cell.x * cellWallLengthX, cell.y * cellWallLengthY + cellWallLengthY);
        this.context.stroke();
      }
    }
    private getCandidates(center: Cell) {
      const candidates: Cell[] = [];
      if (center.x >= 1) {
          candidates.push(this.cells[center.x - 1][center.y]);
      }
      if (center.x < (this.width - 1)) {
          candidates.push(this.cells[center.x + 1][center.y]);
      }
      if (center.y >= 1) {
          candidates.push(this.cells[center.x][center.y - 1]);
      }
      if (center.y < (this.height - 1)) {
          candidates.push(this.cells[center.x][center.y + 1]);
      }
      return candidates.filter((x) => x.visited === false);
    }
    private updateWalls(current: Cell, next: Cell) {
      if (next.x > current.x) {
          current.eastWall = false;
          next.westWall = false;
          return;
      }
      if (next.x < current.x) {
          current.westWall = false;
          next.eastWall = false;
          return;
      }
      if (next.y > current.y) {
          current.southWall = false;
          next.northWall = false;
          return;
      }
      if (next.y < current.y) {
          current.northWall = false;
          next.southWall = false;
          return;
      }
    }
}
