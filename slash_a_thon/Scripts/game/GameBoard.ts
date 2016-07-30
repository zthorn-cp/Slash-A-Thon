/// <reference path="Map.ts"/>

namespace Game {

    export interface IGameBoard {
        width: number;
        height: number;
        isRunning: boolean;
        lastTime: number;
        backdrop: Sprite;
        map:Map;
        player: Player;
        
        drawBackdrop():void;
        update(ticks: number): boolean;
        objects: Array<IGameObject>;
        drawObject(obj: IGameObject): void;
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
        player:Player;

        static PIXEL_RATIO = (function () {
            //const ctx = document.createElement("canvas").getContext("2d");
            const dpr = window.devicePixelRatio || 1;
            const bsr = 1;

            return dpr / bsr;
        })();

        constructor(public width: number, public height: number) {
            this.createScaledCanvas(width, height);

            // handle interaction events
            window.onkeydown = (ev: KeyboardEvent) =>this.handleKeyDown(ev);
            window.onkeyup = (ev:KeyboardEvent) => this.handleKeyUp(ev);
        }



        private createScaledCanvas(width: number, height: number): void {
            const ratio = GameBoard.PIXEL_RATIO;
            this.canvas = document.createElement("canvas");
            this.canvas.width = width * ratio;
            this.canvas.height = height * ratio;
            this.canvas.style.width = width + "px";
            this.canvas.style.height = height + "px";
            this.canvas.style.border = "solid 1px gray";
            this.canvas.style.backgroundImage = "url(/content/img/backdrops/sand.png)";
            

            this.context = this.canvas.getContext("2d");
            this.context.setTransform(ratio, 0, 0, ratio, 0, 0);

            document.body.appendChild(this.canvas);
        }

        drawBackdrop(): void {
//            this.context.drawImage(
//                this.backdrop.image,
//                0,
//                0,
//                this.backdrop.width,
//                this.backdrop.height,
//                0,
//                0,
//                this.backdrop.width,
//                this.backdrop.height
//            );
        }

        drawObject(obj:IGameObject): void {

//            let bounds = new Bounds(new Vector(obj.position.x - 10, obj.position.y - 10), obj.width + 20, obj.height + 20);
            let bounds = obj.getBounds();

            const actor = obj as IActor;

            if (actor.getLastBounds !== undefined) {
                bounds = Bounds.expand(bounds, actor.getLastBounds());
            }

            // re-render background
//            this.context.drawImage(
//                this.backdrop.image,
//                this.backdrop.width % bounds.left,
//                this.backdrop.height % bounds.top,
//                bounds.width,
//                bounds.height,
//                bounds.left,
//                bounds.top,
//                bounds.width,
//                bounds.height
//            );

            this.context.clearRect(
                bounds.left,
                bounds.top,
                bounds.width,
                bounds.height
            );

            // draw the sprite
            this.context.drawImage(
                obj.sprite.image,
                obj.sprite.offsetX,
                obj.sprite.offsetY,
                obj.sprite.width,
                obj.sprite.height,
                obj.position.x,
                obj.position.y,
                obj.sprite.width,
                obj.sprite.height
            );
        }

        update(time: number): boolean {
            const didUpdate = new Array<IGameObject>();
            const flagged = new Array<IGameObject>();
            const ticks = time - this.lastTime;
            this.lastTime = time;

            console.debug(`Running with interval ${ticks}`);

            for (let object of this.objects) {
                if (object.update(ticks, this)) {
                    didUpdate.push(object);
                }

                if (object.flagedForRemoval) {
                    flagged.push(object);
                }
            }


            // check for collisions
            for (let firstIndex = 0; firstIndex < this.objects.length; firstIndex++) {
                const firstItem = this.objects[firstIndex];
                const firstBounds = firstItem.getBounds();

                for (let secondIndex = firstIndex + 1; secondIndex < this.objects.length; secondIndex++) {
                    const secondItem = this.objects[secondIndex];
                    const secondBounds = secondItem.getBounds();

                    if (firstBounds.isInside(secondBounds)) {
                        if (firstItem.collideWith(secondItem) && secondItem.collideWith(firstItem)) {
                            didUpdate.push(firstItem);
                            didUpdate.push(secondItem);
                        }
                    }
                }
            }

            // redraw everything that updated
            for (let object of didUpdate) {
                this.drawObject(object);
            }

            for (let object of flagged) {
                const index = this.objects.indexOf(object, 0);
                if (index > -1) {
                    this.objects.splice(index, 1);
                }
            }

            return this.isRunning;
        }
        

        private handleKeyDown(ev: KeyboardEvent) {
            console.debug(`KeyDown: ${ev.key}`);

            switch (ev.key) {
                case "ArrowUp":
                    this.player.direction = Direction.Up;
                    break;
                case "ArrowDown":
                    this.player.direction = Direction.Down;
                    break;
                case "ArrowLeft":
                    this.player.direction = Direction.Left;
                    break;
                case "ArrowRight":
                    this.player.direction = Direction.Right;
                    break;
            }
        }

        private handleKeyUp(ev: KeyboardEvent) {
            console.debug(`KeyUp: ${ev.key}`);

            this.player.direction = Direction.None;
        }
    }
} // namespace Game