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

        

        collideWith(other: IGameObject): boolean {
            const superResult = super.collideWith(other);
            if (superResult) {
                
            }
            return superResult;
        }

        protected getNextDirection(): Direction {
            return this.direction;
        }
    }

}