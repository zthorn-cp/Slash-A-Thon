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
        
    }

} // namespace Game