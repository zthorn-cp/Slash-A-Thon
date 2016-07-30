namespace Game {

    export class Player extends Creature {

        constructor() {
            super();

            this.sprite = new Sprite("content/img/sprites/player.png");
            this.sprite.onReady = (sprite: Sprite) => {
                this.sprite.width = this.width;
                this.sprite.height = this.height;
                this.onReady(this);
            };

            this.affinity = Element.Air;
        }

        update(ticks: number): boolean {
            if (this.direction !== Direction.None) {
                this.move(ticks, this.direction);
                return true;
            }
            return false;
        }

        collideWith(other: IGameObject): boolean { throw new Error("Not implemented"); }
    }

}