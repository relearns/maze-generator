import { Maze } from "./src/types/maze";

const canvas = document.getElementById("mazeCanvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
export function drawMaze(x: number, y: number) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const maze = new Maze(x, y, ctx);
  maze.generate();
  // maze.draw();
}
