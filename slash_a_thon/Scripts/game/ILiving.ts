namespace Game {

    export interface ILiving extends IActor {
        health: number;
        isAlive:boolean;

        takeDamage(damage:number):void;
    }

}