import {Game} from "./game.js"

/**
 * A basic renderer that prints the game state to the console.
 * Can be extended into other rendering contexts.
 */
export class Renderer {
    game: Game;
    constructor(game: Game) {
        this.game = game;
    }
    draw() {
        for (let x = 0; x < this.game.width; x++) {
            let row_to_print: string = "";
            for (let y = 0; y < this.game.height; y++) {
                row_to_print += this.game.map[x][y][0].name;
            }
            console.log(row_to_print);
        }
    }
}

export class CanvasRenderer extends Renderer {
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
    constructor(canvas: HTMLCanvasElement, game: Game) {
        super(game);
        this.canvas = canvas;
        // Assumes the canvas is already in the right aspect ratio, if not we have to do a bit more work. 
        this.context = this.canvas.getContext("2d");
        this.canvas.width = canvas.clientWidth;
        this.canvas.height = canvas.clientHeight;
        this.context.fillStyle = "white";
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
    draw() {
        for (let x = 0; x < this.game.width; x++) {
            for (let y = 0; y < this.game.height; y++) {
                this.context.fillStyle = this.game.map[x][y][0].color;
                this.context.fillRect(x * 50, y * 50, 50, 50);
            }
        }
    }
}


