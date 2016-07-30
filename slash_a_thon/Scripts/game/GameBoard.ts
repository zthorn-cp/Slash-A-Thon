/// <reference path="Map.ts"/>

namespace Game {

    export interface IGameBoard {
        width: number;
        height: number;
        isRunning: boolean;
        lastTime: number;
        backdrop: Sprite;
        map:Map;

        
        drawBackdrop():void;
        update(ticks: number): boolean;
        objects: Array<IGameObject>;
        drawSprite(sprite: Sprite, position:Vector): void;
    }


    export class GameBoard implements IGameBoard {
        private canvas: HTMLCanvasElement;
        private context: CanvasRenderingContext2D;

        // public members
        objects: Array<IGameObject> = new Array<IGameObject>();
        isRunning: boolean;
        lastTime: number = 0;
        backdrop: Sprite;
        map: Map;

        static PIXEL_RATIO = (function () {
            //const ctx = document.createElement("canvas").getContext("2d");
            const dpr = window.devicePixelRatio || 1;
            const bsr = 1;

            return dpr / bsr;
        })();

        constructor(public width: number, public height: number) {
            this.createScaledCanvas(width, height);
        }



        private createScaledCanvas(width: number, height: number): void {
            const ratio = GameBoard.PIXEL_RATIO;
            this.canvas = document.createElement("canvas");
            this.canvas.width = width * ratio;
            this.canvas.height = height * ratio;
            this.canvas.style.width = width + "px";
            this.canvas.style.height = height + "px";
            this.canvas.style.border = "solid 1px gray";

            this.context = this.canvas.getContext("2d");
            this.context.setTransform(ratio, 0, 0, ratio, 0, 0);

            document.body.appendChild(this.canvas);
        }

        drawBackdrop(): void {
            this.context.drawImage(
                this.backdrop.image,
                0,
                0,
                this.backdrop.width,
                this.backdrop.height,
                0,
                0,
                this.backdrop.width,
                this.backdrop.height
            );
        }

        drawSprite(sprite: Sprite, position:Vector): void {
            console.debug(`drawing sprite ${sprite.image.src} at (${position.x},${position.y})`);

            // re-render background
            this.context.drawImage(
                this.backdrop.image,
                this.backdrop.width % position.x,
                this.backdrop.height % position.y,
                sprite.width,
                sprite.height,
                position.x,
                position.y,
                sprite.width,
                sprite.height
            );

            // draw the sprite
            this.context.drawImage(
                sprite.image,
                sprite.offsetX,
                sprite.offsetY,
                sprite.width,
                sprite.height,
                position.x,
                position.y,
                sprite.width,
                sprite.height
            );
        }

        update(time: number): boolean {
            const didUpdate = new Array<IGameObject>();
            const ticks = time - this.lastTime;
            this.lastTime = time;

            console.debug(`Running with interval ${ticks}`);

            for (let object of this.objects) {
                if (object.update(ticks)) {
                    didUpdate.push(object);
                }
            }

            for (let object of didUpdate) {
                this.drawSprite(object.sprite, object.position);
            }

            return this.isRunning;
        }
    }
} // namespace Game