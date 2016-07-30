namespace Game {

    export class Vector {
        constructor(public x: number, public y: number) {
            
        }

        static times(k: number, v: Vector) { return new Vector(k * v.x, k * v.y); }
        static minus(v1: Vector, v2: Vector) { return new Vector(v1.x - v2.x, v1.y - v2.y); }
        static plus(v1: Vector, v2: Vector) { return new Vector(v1.x + v2.x, v1.y + v2.y); }
        static dot(v1: Vector, v2: Vector) { return v1.x * v2.x + v1.y * v2.y; }
        static mag(v: Vector) { return Math.sqrt(v.x * v.x + v.y * v.y); }
        static norm(v: Vector) {
            const mag = Vector.mag(v);
            const div = (mag === 0) ? Infinity : 1.0 / mag;
            return Vector.times(div, v);
        }

        static empty: Vector = new Vector(0,0);
        static up: Vector = new Vector(0, -1);
        static down: Vector = new Vector(0, 1);
        static left: Vector = new Vector(-1, 0);
        static right: Vector = new Vector(1, 0);

        static getVector(dir: Direction): Vector {
            switch (dir) {
                case Direction.None:
                    return Vector.empty;
                case Direction.Up:
                    return Vector.up;
                case Direction.Down:
                    return Vector.down;
                case Direction.Left:
                    return Vector.left;
                case Direction.Right:
                    return Vector.right;
            }
            return undefined;
        }
    }

} // namespace Game