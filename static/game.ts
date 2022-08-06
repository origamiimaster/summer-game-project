/**
 * Represents the game with a 3d array of objects in positions. 
 * For a given position (x,y), Game.map[x][y] = [Background_Object, ForegroundObject, Additional Effect, ...]
 */
export class Game {
    map: Array<Array<Array<GameObject>>>
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
                this.map[i].push([new BlankGameObject(), new BlankGameObject()]);
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
    setBackground(x: number, y: number, tile: GameObject) {
        this.map[x][y][0] = tile;
    }
    getTile(x: number, y: number) {
        return this.map[x][y][1]
    }
    setTile(x: number, y: number, tile: GameObject) {
        this.map[x][y][1] = tile;
    }
    addEffect(x: number, y: number, effect: GameObject){ 
        console.assert(this.map[x][y].length >= 2, "Not enough tiles");
        this.map[x][y].push(effect)
    }
    removeEffects(x: number, y: number){ 
        for (let i = 2; i < this.map[x][y].length; i++) {
            this.map[x][y].pop();
        }
    }
}

export class GameObject {
    name: string;
    color: string;
    sprite: SpriteInformation | null = null;
    constructor(name: string, color: string) {
        if (!color || color == "") {
            // TODO: Add no rendering provided sprite / appearance
            this.color = "#" + Math.floor(Math.random() * 16777215).toString(16);
        } else {
            this.color = color;
        }
        this.name = name;
    }
}
export class SpriteGameObject extends GameObject {
    constructor(name: string, color: string, spriteInfo: SpriteInformation | null) {
        super(name, color);
        if (spriteInfo && spriteInfo != null) {
            this.sprite = spriteInfo;
        }
    }
}

export class BlankGameObject extends GameObject {
    constructor() {
        super("Blank", "rgba(255,255,255,0)")
    }
}

export class RedGameTile extends GameObject {
    constructor() {
        super("RedTile", "rgba(255,0,0,1)")
    }
}

export class BlackGameTile extends GameObject {
    constructor() {
        super("RedTile", "rgba(0,0,0,1)")
    }
}

export class SpriteInformation {
    spriteX: number;
    spriteY: number;
    spriteWidth: number;
    spriteHeight: number;
    constructor(x: number, y: number, w: number, h: number) {
        this.spriteX = x;
        this.spriteY = y;
        this.spriteWidth = w;
        this.spriteHeight = h;
    }
}