namespace Game {

    export abstract class Actor implements IActor {
       
        speed: number = 300;
        direction: Direction = Direction.None;
        isSolid: boolean = true;
        position: Vector = Vector.empty;
        lastPosition: Vector = Vector.empty;
        width: number = 100;
        height: number = 100;
        sprite: Sprite;
        affinity: Element;
        flagedForRemoval: boolean;

        move(ticks: number, dir: Direction): void {
            const distance = this.speed * (ticks / 1000);
            let vector = Vector.getVector(dir);

            vector = Vector.times(distance, vector);
            this.position = Vector.plus(this.position, vector);
        }

        onReady = (obj: IGameObject) => void {};

        update(ticks: number, board: IGameBoard): boolean {
            this.lastPosition = this.position;

            if (this.direction !== Direction.None) {
                this.move(ticks, this.direction);
                return true;
            }
            return false;
        }

        collideWith(other: IGameObject): boolean {
            if (other.isSolid) {
                const myBounds = this.getBounds();
                const otherBounds = other.getBounds();

                if (myBounds.top < otherBounds.bottom && myBounds.bottom > otherBounds.bottom) {
                    this.position.y = otherBounds.bottom + 1;
                }
                else if (myBounds.bottom > otherBounds.top && myBounds.top < otherBounds.top) {
                    this.position.y = otherBounds.top - this.height - 1;
                }

                if (myBounds.left < otherBounds.right && myBounds.right > otherBounds.right) {
                    this.position.x = otherBounds.right + 1;
                }
                else if (myBounds.right > otherBounds.left && myBounds.left < otherBounds.left) {
                    this.position.x = otherBounds.left - this.width - 1;
                }
                this.direction = Direction.None;

                return true;
            }
            return false;
        }

        getBounds(): Bounds {
            return new Bounds(this.position, this.width, this.height);
        }

        getLastBounds(): Bounds { return new Bounds(this.lastPosition, this.width, this.height); }
    }

}