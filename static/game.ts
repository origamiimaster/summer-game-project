/**
 * Represents the game with a 3d array of objects in positions. 
 * Consider switching to a 2d version if only one object can occupy a position at a given time.
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
                this.map[i].push([new GameObject("Blank Tile")]);
            }
        }
    }
}

export class GameObject{
    name: string;
    color: string;
    constructor(name: string){
        this.name = name;
        this.color = "#" + Math.floor(Math.random()*16777215).toString(16);
    }
}

