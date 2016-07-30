/// <reference path="Scenery.ts"/>

namespace Game {

    export class Block extends Scenery
    {
        constructor() {
            super();

            this.sprite = new Sprite("content/img/sprites/block_basic.png");
            this.sprite.onReady = (sprite: Sprite) => {
                    this.sprite.width = this.width;
                    this.sprite.height = this.height;
                    this.onReady(this);
            };

            this.affinity = Element.Earth;
        }
    }


}// namespace Game