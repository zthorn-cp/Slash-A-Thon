namespace Game {

    export class Sprite {
        path: string;
        image: HTMLImageElement;
        width: number = 100;
        height: number = 100;
        offsetX: number = 0;
        offsetY: number = 0;
        numberOfCells: number = 1;
        currentCell: number = 0;
        animationRate: number = 100;
        animationTrim: number = 0;

        onReady: (sprite:Sprite) => void = (sprite:Sprite) => { };

       constructor(path: string) {
           ImageLoader.instance.loadImage(
               path,
               (img: HTMLImageElement) => {
                   this.image = img;
                   this.onReady(this);
               }
           );
        }

        update(ticks: number): void {
            const totalTicks = ticks + this.animationTrim;
            const cellOffset = Math.floor(totalTicks / this.animationRate);
            this.animationTrim = totalTicks % this.animationRate;

            this.currentCell = (this.currentCell + cellOffset) % this.numberOfCells;
        }
    }
}