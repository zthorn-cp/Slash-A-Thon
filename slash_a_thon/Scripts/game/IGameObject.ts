namespace Game {

    export interface IGameObject {
        isSolid: boolean,
        position:Vector,
        width: number;
        height: number;
        
        sprite: Sprite;
        affinity: Element;
        flagedForRemoval: boolean;

        // events
        onReady:(obj:IGameObject) => void;

        update(ticks: number, board: IGameBoard): boolean;
        collideWith(other: IGameObject): boolean;

        getBounds():Bounds;
    }

    export interface IGameObjectConstructor {
        new():IGameObject
    }

} // namespace Game