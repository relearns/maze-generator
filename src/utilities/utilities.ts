export function randFromInterval(start: number, end: number) {
    if (start === end) {
        return start;
    }
    return Math.floor(Math.random() * (end - start + 1) + start);
}
