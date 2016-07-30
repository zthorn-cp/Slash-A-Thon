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
            return ((this.left < other.right) && (this.right > other.left) && (this.top < other.bottom) && (this.bottom > other.top));
        }

        static expand(b1: Bounds, b2: Bounds): Bounds {
            const left = (b1.left < b2.left) ? b1.left : b2.left;
            const top = (b1.top < b2.top) ? b1.top : b2.top;
            const right = (b1.right > b2.right) ? b1.right : b2.right;
            const bottom = (b1.bottom > b2.bottom) ? b1.bottom : b2.bottom;

            const width = right - left;
            const height = bottom - top;
            return new Bounds(new Vector(left, top), width, height);
        }
    }

}