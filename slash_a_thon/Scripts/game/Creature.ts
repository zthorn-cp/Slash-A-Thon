namespace Game {

    export abstract class Creature implements ILiving {
        

        health: number = 5;
        isAlive: boolean = true;
        speed: number = 300;
        direction:Direction = Direction.None;
        isSolid: boolean = true;
        position: Vector = Vector.empty;
        lastPosition: Vector = Vector.empty;
        width: number = 100;
        height: number = 100;
        sprite: Sprite;
        affinity: Element;
        flagedForRemoval: boolean;

        takeDamage(damage: number): void {
            this.health -= damage;
            if (this.health < 0) {
                this.health = 0;
                this.isAlive = false;
                this.flagedForRemoval = true;
            }
        }

        move(ticks: number, dir: Direction): void {
            this.lastPosition = this.position;

            const distance = this.speed * (ticks / 1000);
            let vector = Vector.getVector(dir);

            vector = Vector.times(distance, vector);
            this.position = Vector.plus(this.position, vector);
        }

        onReady = (obj: IGameObject) => void { };

        abstract update(ticks: number, board: IGameBoard): boolean;

        abstract collideWith(other: IGameObject): boolean;

        getBounds(): Bounds {
             return new Bounds(this.position, this.width, this.height);
        }

        getLastBounds(): Bounds { return new Bounds(this.lastPosition, this.width, this.height); }
    }

}// namespace Game