/// <reference path="Map.ts"/>
/// <reference path="GameBoard.ts"/>

namespace Game {

    export interface IMapLoader {
        loadMap(path: string, gameBoard:IGameBoard, callback: (map: Map) => void): void;
    }

    

    export class MapLoader implements IMapLoader{
        private cellMap = {
            ' ': CellType.None,
            '#': CellType.Block,
            '$': CellType.PlayerSpawnPoint,
            '@': CellType.MonsterSpawnPoint,
            '~': CellType.Water,
            '^': CellType.Lava,
            '%': CellType.Canyon,

            // reserved for future use
            '!': CellType.None,
            '&': CellType.None,
            '*': CellType.None,
            '(': CellType.None,
            ')': CellType.None,
            '_': CellType.None,
            '-': CellType.None,
            '+': CellType.None,
            '=': CellType.None
        };

        cellWidth = 100;
        cellHeight = 100;

        constructor(public typeMap:TypeMap){}


        loadMap(path: string, gameBoard: IGameBoard, callback: (map: Map) => void): void {
            var client = new XMLHttpRequest();
            const self = this;
            client.open("GET", path);

            client.onreadystatechange = function () {
                if (client.readyState === 4) {
                    if (client.status === 200) {
                        const params = JSON.parse(client.responseText);
                        const map = new Map(params.width, params.height);

                        gameBoard.objects = new Array<IGameObject>();
                        self.parseData(params.data, map, gameBoard);

                        gameBoard.map = map;
                        callback(map);
                    }
                }
            };

            client.send();
        }

        parseCell(cell: string): CellType {
            return this.cellMap[cell];
        }

        parseData(data: string, map: Map, gameBoard: IGameBoard): void {
            const rows = data.split("\n");
            for (let y = 0; y < map.height; y++) {
                const row = rows[y];
                for (let x = 0; x < map.width; x++) {
                    const col = row[x];
                    const cellType = this.parseCell(col);

                    map.cells[x][y] = cellType;

                    if (cellType >= 10) {

                        const obj = this.typeMap.getObject(cellType);
                        if (obj !== undefined) {
                            obj.position = new Vector(x * this.cellWidth, y * this.cellHeight);
                            gameBoard.objects.push(obj);
                        }
                    }
                    else if (cellType === CellType.PlayerSpawnPoint) {
                        map.playerSpawnPoints.push(new Vector(x * this.cellWidth, y * this.cellHeight));
                    }
                    else if (cellType === CellType.MonsterSpawnPoint) {
                        map.monsterSpawnPoints.push(new Vector(x * this.cellWidth, y * this.cellHeight));
                    }
                }
            }
        }


    }
}