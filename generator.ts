const canvas = document.getElementById("mazeCanvas") as HTMLCanvasElement;
let ctx = canvas.getContext("2d");
if (ctx !== null) {
    ctx.fillStyle = "rgb(200,0,0)";
    ctx.fillRect(10, 10, 50, 60);
}
