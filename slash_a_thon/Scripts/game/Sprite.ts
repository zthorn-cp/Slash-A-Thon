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

        constructor(path: string = undefined) {
            if (path !== undefined) {
                this.load(path);
            }
        }

        load(path: string) {
            this.image = document.createElement("img");
            this.image.src = path;
            this.path = path;
        }

        update(ticks: number): void {
            const totalTicks = ticks + this.animationTrim;
            const cellOffset = Math.floor(totalTicks / this.animationRate);
            this.animationTrim = totalTicks % this.animationRate;

            this.currentCell = (this.currentCell + cellOffset) % this.numberOfCells;
        }
    }
}