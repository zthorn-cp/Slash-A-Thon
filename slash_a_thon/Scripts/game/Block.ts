/// <reference path="Core.ts"/>
/// <reference path="Sprite.ts"/>

namespace Game {

    export class Block implements IGameObject
    {
        constructor() {
            this.sprite = new Sprite("content/img/sprites/block_basic.png");
            this.sprite.onReady = (sprite: Sprite) => {
                    this.sprite.width = this.width;
                    this.sprite.height = this.height;
                    this.onReady(this);
                };
        }

        position: Vector;
        sprite: Sprite;
        isSolid = true;
        width = 100;
        height = 100;
        affinity = Element.Earth;

        onReady: (obj: IGameObject)=> void = (obj: IGameObject) => {};

        // blocks don't do anything, they just sit there.
        update(ticks: number): boolean { return false; }
        collideWith(other: IGameObject): boolean { return true; }

        
    }


}// namespace Game