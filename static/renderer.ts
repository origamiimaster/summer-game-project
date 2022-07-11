import { Game } from "./game.js"

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
    spriteHandler: SpriteHandler;
    constructor(canvas: HTMLCanvasElement, game: Game) {
        super(game);
        this.canvas = canvas;
        // Assumes the canvas is already in the right aspect ratio, if not we have to do a bit more work. 
        this.context = this.canvas.getContext("2d");
        this.canvas.width = canvas.clientWidth;
        this.canvas.height = canvas.clientHeight;
        this.context.fillStyle = "white";
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.spriteHandler = new SpriteHandler(45, 50);
        // Temp code to test out rendering
        this.spriteHandler.loadSpriteSheet("chess.png", [[0, 0]]);
    }
    draw() {
        for (let x = 0; x < this.game.width; x++) {
            for (let y = 0; y < this.game.height; y++) {
                this.context.fillStyle = this.game.map[x][y][0].color;
                this.context.fillRect(x * 50, y * 50, 50, 50);
            }
        }
        this.spriteHandler.drawSprite(this.context, 0, 0, 0, 0);
    }
}

/**
 * Loads and renders sprites for the canvas renderer.
 * Currently only supports sprites of a fixed size. 
 * Additionally does not yet handle awaiting image load.
 */
export class SpriteHandler {
    spritesheets : Array<[HTMLImageElement, Array<[number, number]>]>;
    width: number;
    height: number;
    constructor(spriteWidth: number, spriteHeight: number) {
        this.spritesheets = [];
        this.width = spriteWidth;
        this.height = spriteHeight;
    }
    /**
     * Pass in the path to the image, and an array consisting of [x,y] coordinate pairs for each sprite in order. 
     */
    loadSpriteSheet(imagePath: string, coordinates: Array<[number, number]>){ 
        let image = document.createElement("img");
        image.src = imagePath;
        this.spritesheets.push([image, coordinates]);
    }
    drawSprite(ctx: CanvasRenderingContext2D, canvasX: number, canvasY: number, spritesheetNumber: number, spriteNumber: number){
        // ctx.drawImage(this.spritesheets[spritesheetNumber][0], 0, 0);
        ctx.drawImage(this.spritesheets[spritesheetNumber][0], this.spritesheets[spritesheetNumber][1][spriteNumber][0], this.spritesheets[spritesheetNumber][1][spriteNumber][1], this.width, this.height, canvasX, canvasY, this.width, this.height);
        // ctx.drawImage(this.spritesheets[spritesheetNumber][0], 0, 0, 270, 90, 0, 0, 270, 90);
    }
}


