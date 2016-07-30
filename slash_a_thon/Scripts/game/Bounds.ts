namespace Game {

    export class Bounds {
        top: number;
        left: number;
        bottom: number;
        right: number;
        width: number;
        height: number;

        constructor(v: Vector, width: number, height: number) {
            this.top = v.y;
            this.left = v.x;
            this.bottom = this.top + height;
            this.right = this.left + width;
            this.width = width;
            this.height = height;
        }

        isInside(other: Bounds): boolean {
            return ((this.left < this.right) && (this.left > other.right) && (this.top < other.bottom) && (this.bottom > other.top));
        }

        static expand(b1: Bounds, b2: Bounds): Bounds {
            const x = (b1.left < b2.left) ? b1.left : b2.left;
            const y = (b1.top < b2.top) ? b1.top : b2.top;
            const width = (b1.width > b2.width) ? b2.width : b1.width;
            const height = (b1.height > b2.height) ? b2.height : b1.height;
            return new Bounds(new Vector(x, y), width, height);
        }
    }

}