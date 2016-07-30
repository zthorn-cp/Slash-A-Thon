

namespace Game {

    export class Map {
        cells: Array<Array<CellType>>;
        playerSpawnPoints: Array<Vector> = new Array<Vector>();
        monsterSpawnPoints: Array<Vector> = new Array<Vector>();

        constructor(public width: number, public height: number) {
            this.cells = new Array<Array<CellType>>();

            for (let x = 0; x < this.width; x++) {
                const row = new Array<CellType>();
                this.cells.push(row);
                for (let y = 0; y < this.height; y++) {
                    row.push(CellType.None);
                }
            }
        }

        getCell(x: number, y: number): CellType {
            return this.cells[x][y];
        }
    }

} // namespace Game