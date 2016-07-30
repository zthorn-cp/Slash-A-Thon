/// <reference path="GameBoard.ts"/>
/// <reference path="Block.ts"/>

namespace Game {

    var gameBoard: IGameBoard;
    var mapLoader: MapLoader;

    function loadImages() {
        console.log("Loading Images...");

        
        ImageLoader.instance.loadImage("/content/img/backdrops/sand.png", () => { });
        ImageLoader.instance.loadImage("/content/img/sprites/player.png", () => { });
        ImageLoader.instance.loadImage("/content/img/sprites/block_basic.png", () => { });

        ImageLoader.instance.onReady=loadMap;
    }

    function loadMap() {
        console.log("Loading Map...");

        const typeMap = new TypeMap();
        typeMap.setMapping(CellType.Block, Block);

        mapLoader = new MapLoader(typeMap);
        mapLoader.loadMap("/scripts/game/maps/level1.json", gameBoard, onMapLoaded);
    }

    function onMapLoaded(map: Map) {

        const player = getPlayer();
        gameBoard.player = player;
        gameBoard.objects.push(player);

        initialDrawing();
    }

    function initialDrawing() {
        // initial draw
        console.debug("Initial drawing");

        const backdrop = new Sprite("/content/img/backdrops/sand.png");
        backdrop.height = 500;
        backdrop.width = 1000;
        
        gameBoard.backdrop = backdrop;
        gameBoard.drawBackdrop();

        for (let object of gameBoard.objects) {
            gameBoard.drawObject(object);
        }

        gameBoard.isRunning = true;
        window.requestAnimationFrame(gameLoop);
    }


    function getPlayer() :Player{
        const spawnPointCount = gameBoard.map.playerSpawnPoints.length;
        const spawnPointIndex = Math.floor(Math.random() * spawnPointCount);
        const spawnPoint = gameBoard.map.playerSpawnPoints[spawnPointIndex];

        const player = new Player();
        player.position = spawnPoint;
        player.lastPosition = spawnPoint;

        return player;
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

        gameBoard = new GameBoard(1000, 500);

        loadImages();
    }
}