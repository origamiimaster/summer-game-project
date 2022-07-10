import { CanvasRenderer, Renderer} from "./renderer.js"
import { Game, GameObject } from "./game.js"
let myGame: Game = new Game(10, 10);
let myRenderer: Renderer = new CanvasRenderer(<HTMLCanvasElement> document.getElementById("canvas"), myGame);
myRenderer.draw();
