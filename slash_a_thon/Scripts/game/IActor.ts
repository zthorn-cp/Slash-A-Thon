namespace Game {

    export interface IActor extends IGameObject {
        speed: number;
        direction: Direction;
        lastPosition: Vector;

        move: (ticks: number, dir: Direction) => void;
        getLastBounds():Bounds;
    }
}// namespace Game