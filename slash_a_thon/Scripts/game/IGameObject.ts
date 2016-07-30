namespace Game {

    export interface IGameObject {
        isSolid: boolean,
        position:Vector,
        width: number;
        height: number;
        sprite: Sprite;
        affinity: Element;

        update(ticks: number): boolean;
        collideWith(other: IGameObject): boolean;
    }

    export interface IGameObjectConstructor {
        new():IGameObject
    }

} // namespace Game