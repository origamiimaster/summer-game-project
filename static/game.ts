/**
 * Represents the game with a 3d array of objects in positions. 
 * For a given position (x,y), Game.map[x][y] = [Background_Object, ForegroundObject, Additional Effect]
 */
export class Game {
    map: Array<Array<[GameObject, GameObject, GameObject]>>
    width: number;
    height: number;
    constructor(width: number, height: number) {
        // Create tilemap
        this.map = [];
        this.width = width;
        this.height = height;
        for (let i = 0; i < width; i++) {
            this.map.push([]);
            for (let j = 0; j < height; j++) {
                this.map[i].push([new BlankGameObject(), new BlankGameObject(), new BlankGameObject()]);
                if ((i + j) % 2 == 0) {
                    this.setBackground(i, j, new RedGameTile());
                } else {
                    this.setBackground(i, j, new BlackGameTile())
                }
            }
        }
    }
    getBackground(x: number, y: number) {
        return this.map[x][y][0]
    }
    setBackground(x: number, y: number, tile: GameObject){ 
        this.map[x][y][0] = tile;
    }
}

export class GameObject{
    name: string;
    color: string;
    constructor(name: string, color: string){
        if (!color || color == ""){
            this.color = "#" + Math.floor(Math.random()*16777215).toString(16);
        } else {
            this.color = color;
        }
        this.name = name;
    }
}

export class BlankGameObject extends GameObject{
    constructor(){
        super("Blank", "rgba(255,255,255,0)")
    }
}

export class RedGameTile extends GameObject{
    constructor(){
        super("RedTile", "rgba(255,0,0,1)")
    }
}
export class BlackGameTile extends GameObject{
    constructor(){
        super("RedTile", "rgba(0,0,0,1)")
    }
}