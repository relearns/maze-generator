import { Maze } from "./types/maze";
import { randFromInterval } from "./utilities/utilities";

const m = new Maze(5, 5);
m.current = m.cells[randFromInterval(0, 5)][randFromInterval(0, 5)];
console.log(m.cells);
