import { Maze } from "./types/maze";

const m = new Maze(5, 5);
m.generate();
console.log(m.cells);
