import { Maze } from "./src/types/maze";

const canvas = document.getElementById("mazeCanvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
export function drawMaze(x: number, y: number) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const maze = new Maze(x, y, ctx);
  maze.generate();
  maze.drawAll();
}
let stepMaze: Maze;
export function drawStep(x: number, y: number) {
  if (stepMaze === undefined) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    stepMaze = new Maze(x, y, ctx);
    stepMaze.generate();
  }
  stepMaze.drawNext();
}
