import { randFromInterval } from "../utilities/utilities";
import { Cell } from "./cell";

export class Maze {
  public cells: Cell[][];
  public current: Cell;
  public visitedCount: number;
  private width: number;
  private height: number;
  private stack: Cell[];
  constructor(width: number, height: number) {
    this.cells = [];
    for (let i: number = 0; i < width; i++) {
      this.cells[i] = [];
      for (let j: number = 0; j < height; j++) {
        this.cells[i][j] = new Cell(i, j);
      }
    }
    this.visitedCount = 0;
    this.stack = [];
    this.width = width;
    this.height = height;
    this.current = this.cells[0][0];
    this.current.visited = true;
    this.visitedCount = 1;
  }
  public generate() {
    do {
      const candidates = this.getCandidates(this.current);
      if (candidates.length > 0) {
        const join = candidates[randFromInterval(0, candidates.length - 1)];
        join.visited = true;
        this.visitedCount++;
        this.updateWalls(this.current, join);
        this.stack.push(this.current);
        this.current = join;
      } else {
        this.current = this.stack.pop() as Cell;
      }
    } while (this.visitedCount !== this.width * this.height);
  }
  public draw(context: CanvasRenderingContext2D) {
    const width = context.canvas.width;
    const height = context.canvas.height;
    const cellWallLengthX = width / this.width;
    const cellWallLengthY = height / this.height;
    let currentX = 0;
    let currentY = 0;
    for (const column of this.cells) {
      for (const cell of column) {
        if (cell.northWall) {
          context.beginPath();
          context.moveTo(currentX, currentY);
          context.lineTo(currentX + cellWallLengthX, currentY);
          context.stroke();
        }
        if (cell.eastWall) {
          context.beginPath();
          context.moveTo(currentX + cellWallLengthX, currentY);
          context.lineTo(currentX + cellWallLengthX, currentY + cellWallLengthY);
          context.stroke();
        }
        if (cell.southWall) {
          context.beginPath();
          context.moveTo(currentX, currentY + cellWallLengthY);
          context.lineTo(currentX + cellWallLengthX, currentY + cellWallLengthY);
          context.stroke();
        }
        if (cell.westWall) {
          context.beginPath();
          context.moveTo(currentX, currentY);
          context.lineTo(currentX , currentY + cellWallLengthY);
          context.stroke();
        }
        currentY += cellWallLengthY;
      }
      currentX += cellWallLengthX;
      currentY = 0;
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
