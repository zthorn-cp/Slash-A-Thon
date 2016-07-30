/// <reference path="GameBoard.ts"/>
/// <reference path="Block.ts"/>

namespace Game {

    var gameBoard: IGameBoard;
    var mapLoader: MapLoader;

    function onMapLoaded(map: Map) {
        initialDrawing();
    }

    function initialDrawing() {
        // initial draw
        console.debug("Initial drawing");

        gameBoard.drawBackdrop();

        for (let object of gameBoard.objects) {
            gameBoard.drawSprite(object.sprite, object.position);
        }

        window.requestAnimationFrame(gameLoop);
    }

    function gameLoop(time: number) {
        if (gameBoard.update(time)) {
            window.requestAnimationFrame(gameLoop);
        } else {
            console.log("Game Loop Terminated");
        }
    }

    export function startGame() {
        console.log("Starting Game...");

        const typeMap = new TypeMap();
        typeMap.setMapping(CellType.Block, Block);

        mapLoader = new MapLoader(typeMap);

        gameBoard = new GameBoard(1000, 500);

        mapLoader.loadMap("/scripts/game/maps/level1.json", gameBoard, onMapLoaded);
    }
}