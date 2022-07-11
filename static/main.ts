import { CanvasRenderer, Renderer} from "./renderer.js"
import { Game } from "./game.js"
let myGame: Game = new Game(10, 10);
let myRenderer: Renderer = new CanvasRenderer(<HTMLCanvasElement> document.getElementById("canvas"), myGame);
myRenderer.draw();

let startTime = 0;
function loop(ms: number) {
    let diff = ms - startTime;
    console.log(`Time passed so far is ${Math.round(diff * 100) / 100} ms.`);
    myRenderer.draw();
    startTime = ms;
    requestAnimationFrame(loop);
}
requestAnimationFrame(loop)