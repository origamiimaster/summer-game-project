let canvas: HTMLCanvasElement = <HTMLCanvasElement> document.getElementById("canvas");
let context = canvas.getContext("2d");

let squareX = 0;

let startTime = 0;
function draw(timedelta: number) {
    let millisecondsPassed = timedelta - startTime
    context.fillStyle = "white";
    context.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);
    squareX += (10 / 100) * (millisecondsPassed);
    squareX %= canvas.clientWidth
    context.fillStyle = "blue";
    context.fillRect(squareX, 0, 50, 50);
    startTime = timedelta;
    requestAnimationFrame(draw)
}


draw(0);