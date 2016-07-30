namespace Game {

    export abstract class Scenery implements IGameObject
    {
        constructor() {
           
        }

        position: Vector;
        sprite: Sprite;
        isSolid = true;
        width = 100;
        height = 100;
        affinity;

        flagedForRemoval: boolean;

        onReady: (obj: IGameObject) => void = (obj: IGameObject) => { };

        // blocks don't do anything, they just sit there.
        update(ticks: number, board: IGameBoard): boolean {
             return false;
        }

        collideWith(other: IGameObject): boolean { return true; }

        getBounds(): Bounds {
            return new Bounds(this.position, this.width, this.height);
        }
    }

}