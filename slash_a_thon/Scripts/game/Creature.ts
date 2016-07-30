namespace Game {

    export abstract class Creature
        extends Actor
        implements ILiving
    {
        

        health: number = 5;
        isAlive: boolean = true;

        takeDamage(damage: number): void {
            this.health -= damage;
            if (this.health < 0) {
                this.health = 0;
                this.isAlive = false;
                this.flagedForRemoval = true;
            }
        }
        
        update(ticks: number, board: IGameBoard): boolean {
            this.direction = this.getNextDirection();

            return super.update(ticks, board);
        }

        protected abstract getNextDirection(): Direction ;
    }

}// namespace Game