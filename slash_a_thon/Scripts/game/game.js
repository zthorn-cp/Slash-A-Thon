var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Game;
(function (Game) {
    var Scenery = (function () {
        function Scenery() {
            this.isSolid = true;
            this.width = 100;
            this.height = 100;
            this.onReady = function (obj) { };
        }
        // blocks don't do anything, they just sit there.
        Scenery.prototype.update = function (ticks, board) {
            return false;
        };
        Scenery.prototype.collideWith = function (other) { return true; };
        Scenery.prototype.getBounds = function () {
            return new Game.Bounds(this.position, this.width, this.height);
        };
        return Scenery;
    }());
    Game.Scenery = Scenery;
})(Game || (Game = {}));
/// <reference path="Scenery.ts"/>
var Game;
(function (Game) {
    var Block = (function (_super) {
        __extends(Block, _super);
        function Block() {
            var _this = this;
            _super.call(this);
            this.sprite = new Game.Sprite("content/img/sprites/block_basic.png");
            this.sprite.onReady = function (sprite) {
                _this.sprite.width = _this.width;
                _this.sprite.height = _this.height;
                _this.onReady(_this);
            };
            this.affinity = Game.Element.Earth;
        }
        return Block;
    }(Game.Scenery));
    Game.Block = Block;
})(Game || (Game = {})); // namespace Game
var Game;
(function (Game) {
    var Bounds = (function () {
        function Bounds(v, width, height) {
            this.top = v.y;
            this.left = v.x;
            this.bottom = this.top + height;
            this.right = this.left + width;
            this.width = width;
            this.height = height;
        }
        Bounds.prototype.isInside = function (other) {
            return ((this.left < this.right) && (this.left > other.right) && (this.top < other.bottom) && (this.bottom > other.top));
        };
        Bounds.expand = function (b1, b2) {
            var x = (b1.left < b2.left) ? b1.left : b2.left;
            var y = (b1.top < b2.top) ? b1.top : b2.top;
            var width = (b1.width > b2.width) ? b2.width : b1.width;
            var height = (b1.height > b2.height) ? b2.height : b1.height;
            return new Bounds(new Game.Vector(x, y), width, height);
        };
        return Bounds;
    }());
    Game.Bounds = Bounds;
})(Game || (Game = {}));
var Game;
(function (Game) {
    (function (CellType) {
        CellType[CellType["None"] = 0] = "None";
        CellType[CellType["PlayerSpawnPoint"] = 1] = "PlayerSpawnPoint";
        CellType[CellType["MonsterSpawnPoint"] = 2] = "MonsterSpawnPoint";
        CellType[CellType["Block"] = 10] = "Block";
        CellType[CellType["Lava"] = 11] = "Lava";
        CellType[CellType["Water"] = 12] = "Water";
        CellType[CellType["Canyon"] = 13] = "Canyon";
    })(Game.CellType || (Game.CellType = {}));
    var CellType = Game.CellType;
})(Game || (Game = {}));
var Game;
(function (Game) {
    var Creature = (function () {
        function Creature() {
            this.health = 5;
            this.isAlive = true;
            this.speed = 300;
            this.direction = Game.Direction.None;
            this.isSolid = true;
            this.position = Game.Vector.empty;
            this.lastPosition = Game.Vector.empty;
            this.width = 100;
            this.height = 100;
            this.onReady = function (obj) { return void {}; };
        }
        Creature.prototype.takeDamage = function (damage) {
            this.health -= damage;
            if (this.health < 0) {
                this.health = 0;
                this.isAlive = false;
                this.flagedForRemoval = true;
            }
        };
        Creature.prototype.move = function (ticks, dir) {
            this.lastPosition = this.position;
            var distance = this.speed * (ticks / 1000);
            var vector = Game.Vector.getVector(dir);
            vector = Game.Vector.times(distance, vector);
            this.position = Game.Vector.plus(this.position, vector);
        };
        Creature.prototype.getBounds = function () {
            return new Game.Bounds(this.position, this.width, this.height);
        };
        Creature.prototype.getLastBounds = function () { return new Game.Bounds(this.lastPosition, this.width, this.height); };
        return Creature;
    }());
    Game.Creature = Creature;
})(Game || (Game = {})); // namespace Game
var Game;
(function (Game) {
    (function (Direction) {
        Direction[Direction["None"] = 0] = "None";
        Direction[Direction["Up"] = 1] = "Up";
        Direction[Direction["Right"] = 2] = "Right";
        Direction[Direction["Down"] = 3] = "Down";
        Direction[Direction["Left"] = 4] = "Left";
    })(Game.Direction || (Game.Direction = {}));
    var Direction = Game.Direction;
})(Game || (Game = {}));
var Game;
(function (Game) {
    (function (Element) {
        Element[Element["Earth"] = 1] = "Earth";
        Element[Element["Water"] = 2] = "Water";
        Element[Element["Air"] = 4] = "Air";
        Element[Element["Fire"] = 8] = "Fire";
    })(Game.Element || (Game.Element = {}));
    var Element = Game.Element;
})(Game || (Game = {}));
var Game;
(function (Game) {
    var Map = (function () {
        function Map(width, height) {
            this.width = width;
            this.height = height;
            this.playerSpawnPoints = new Array();
            this.monsterSpawnPoints = new Array();
            this.cells = new Array();
            for (var x = 0; x < this.width; x++) {
                var row = new Array();
                this.cells.push(row);
                for (var y = 0; y < this.height; y++) {
                    row.push(Game.CellType.None);
                }
            }
        }
        Map.prototype.getCell = function (x, y) {
            return this.cells[x][y];
        };
        return Map;
    }());
    Game.Map = Map;
})(Game || (Game = {})); // namespace Game
/// <reference path="Map.ts"/>
var Game;
(function (Game) {
    var GameBoard = (function () {
        function GameBoard(width, height) {
            var _this = this;
            this.width = width;
            this.height = height;
            // public members
            this.objects = new Array();
            this.lastTime = 0;
            this.createScaledCanvas(width, height);
            // handle interaction events
            window.onkeydown = function (ev) { return _this.handleKeyDown(ev); };
            window.onkeyup = function (ev) { return _this.handleKeyUp(ev); };
        }
        GameBoard.prototype.createScaledCanvas = function (width, height) {
            var ratio = GameBoard.PIXEL_RATIO;
            this.canvas = document.createElement("canvas");
            this.canvas.width = width * ratio;
            this.canvas.height = height * ratio;
            this.canvas.style.width = width + "px";
            this.canvas.style.height = height + "px";
            this.canvas.style.border = "solid 1px gray";
            this.context = this.canvas.getContext("2d");
            this.context.setTransform(ratio, 0, 0, ratio, 0, 0);
            document.body.appendChild(this.canvas);
        };
        GameBoard.prototype.drawBackdrop = function () {
            this.context.drawImage(this.backdrop.image, 0, 0, this.backdrop.width, this.backdrop.height, 0, 0, this.backdrop.width, this.backdrop.height);
        };
        GameBoard.prototype.drawObject = function (obj) {
            var bounds = obj.getBounds();
            var actor = obj;
            if (actor.getLastBounds !== undefined) {
                bounds = Game.Bounds.expand(bounds, actor.getLastBounds());
            }
            // re-render background
            this.context.drawImage(this.backdrop.image, this.backdrop.width % bounds.left, this.backdrop.height % bounds.top, bounds.width, bounds.height, bounds.left, bounds.top, bounds.width, bounds.height);
            // draw the sprite
            this.context.drawImage(obj.sprite.image, obj.sprite.offsetX, obj.sprite.offsetY, obj.sprite.width, obj.sprite.height, obj.position.x, obj.position.y, obj.sprite.width, obj.sprite.height);
        };
        GameBoard.prototype.update = function (time) {
            var didUpdate = new Array();
            var flagged = new Array();
            var ticks = time - this.lastTime;
            this.lastTime = time;
            console.debug("Running with interval " + ticks);
            for (var _i = 0, _a = this.objects; _i < _a.length; _i++) {
                var object = _a[_i];
                if (object.update(ticks, this)) {
                    didUpdate.push(object);
                }
                if (object.flagedForRemoval) {
                    flagged.push(object);
                }
            }
            // check for collisions
            for (var firstIndex = 0; firstIndex < this.objects.length; firstIndex++) {
                var firstItem = this.objects[firstIndex];
                var firstBounds = firstItem.getBounds();
                for (var secondIndex = firstIndex + 1; secondIndex < this.objects.length; secondIndex++) {
                    var secondItem = this.objects[secondIndex];
                    var secondBounds = secondItem.getBounds();
                    if (firstBounds.isInside(secondBounds)) {
                        firstItem.collideWith(secondItem);
                    }
                }
            }
            // redraw everything that updated
            for (var _b = 0, didUpdate_1 = didUpdate; _b < didUpdate_1.length; _b++) {
                var object = didUpdate_1[_b];
                this.drawObject(object);
            }
            for (var _c = 0, flagged_1 = flagged; _c < flagged_1.length; _c++) {
                var object = flagged_1[_c];
                var index = this.objects.indexOf(object, 0);
                if (index > -1) {
                    this.objects.splice(index, 1);
                }
            }
            return this.isRunning;
        };
        GameBoard.prototype.handleKeyDown = function (ev) {
            console.debug("KeyDown: " + ev.key);
            switch (ev.key) {
                case "ArrowUp":
                    this.player.direction = Game.Direction.Up;
                    break;
                case "ArrowDown":
                    this.player.direction = Game.Direction.Down;
                    break;
                case "ArrowLeft":
                    this.player.direction = Game.Direction.Left;
                    break;
                case "ArrowRight":
                    this.player.direction = Game.Direction.Right;
                    break;
            }
        };
        GameBoard.prototype.handleKeyUp = function (ev) {
            console.debug("KeyUp: " + ev.key);
            this.player.direction = Game.Direction.None;
        };
        GameBoard.PIXEL_RATIO = (function () {
            //const ctx = document.createElement("canvas").getContext("2d");
            var dpr = window.devicePixelRatio || 1;
            var bsr = 1;
            return dpr / bsr;
        })();
        return GameBoard;
    }());
    Game.GameBoard = GameBoard;
})(Game || (Game = {})); // namespace Game
/// <reference path="GameBoard.ts"/>
/// <reference path="Block.ts"/>
var Game;
(function (Game) {
    var gameBoard;
    var mapLoader;
    function loadImages() {
        console.log("Loading Images...");
        Game.ImageLoader.instance.loadImage("content/img/backdrops/sand.png", function () { });
        Game.ImageLoader.instance.loadImage("content/img/sprites/player.png", function () { });
        Game.ImageLoader.instance.loadImage("content/img/sprites/block_basic.png", function () { });
        Game.ImageLoader.instance.onReady = loadMap;
    }
    function loadMap() {
        console.log("Loading Map...");
        var typeMap = new Game.TypeMap();
        typeMap.setMapping(Game.CellType.Block, Game.Block);
        mapLoader = new Game.MapLoader(typeMap);
        mapLoader.loadMap("/scripts/game/maps/level1.json", gameBoard, onMapLoaded);
    }
    function onMapLoaded(map) {
        var player = getPlayer();
        gameBoard.player = player;
        gameBoard.objects.push(player);
        initialDrawing();
    }
    function initialDrawing() {
        // initial draw
        console.debug("Initial drawing");
        var backdrop = new Game.Sprite("/content/img/backdrops/sand.png");
        backdrop.height = 500;
        backdrop.width = 1000;
        gameBoard.backdrop = backdrop;
        gameBoard.drawBackdrop();
        for (var _i = 0, _a = gameBoard.objects; _i < _a.length; _i++) {
            var object = _a[_i];
            gameBoard.drawObject(object);
        }
        gameBoard.isRunning = true;
        window.requestAnimationFrame(gameLoop);
    }
    function getPlayer() {
        var spawnPointCount = gameBoard.map.playerSpawnPoints.length;
        var spawnPointIndex = Math.floor(Math.random() * spawnPointCount);
        var spawnPoint = gameBoard.map.playerSpawnPoints[spawnPointIndex];
        var player = new Game.Player();
        player.position = spawnPoint;
        return player;
    }
    function gameLoop(time) {
        if (gameBoard.update(time)) {
            window.requestAnimationFrame(gameLoop);
        }
        else {
            console.log("Game Loop Terminated");
        }
    }
    function startGame() {
        console.log("Starting Game...");
        gameBoard = new Game.GameBoard(1000, 500);
        loadImages();
    }
    Game.startGame = startGame;
})(Game || (Game = {}));
var Game;
(function (Game) {
    var ImageLoader = (function () {
        function ImageLoader() {
            this.images = {};
            this.requests = {};
            this.onReady = function () { };
        }
        ImageLoader.prototype.loadImage = function (path, callback) {
            var _this = this;
            var img;
            if (path in this.images) {
                img = this.images[path];
                callback(img);
            }
            else if (path in this.requests) {
                img = this.requests[path];
                var callbackList = img["callbacks"];
                callbackList.push(callback);
            }
            else {
                console.debug("Queueing image for " + path);
                var callbackList_1 = new Array();
                callbackList_1.push(callback);
                img = document.createElement("img");
                img["callbacks"] = callbackList_1;
                this.requests[path] = img;
                img.addEventListener("load", function () {
                    _this.images[path] = img;
                    delete _this.requests[path];
                    for (var _i = 0, callbackList_2 = callbackList_1; _i < callbackList_2.length; _i++) {
                        var c = callbackList_2[_i];
                        c(img);
                    }
                    if (Object.keys(_this.requests).length === 0) {
                        _this.onReady();
                    }
                });
                img.src = path;
            }
        };
        ImageLoader.instance = new ImageLoader();
        return ImageLoader;
    }());
    Game.ImageLoader = ImageLoader;
})(Game || (Game = {}));
/// <reference path="Element.ts" />
var Game;
(function (Game) {
    (function (ItemSlot) {
        ItemSlot[ItemSlot["Armor"] = 1] = "Armor";
        ItemSlot[ItemSlot["Weapon"] = 2] = "Weapon";
        ItemSlot[ItemSlot["Helm"] = 3] = "Helm";
    })(Game.ItemSlot || (Game.ItemSlot = {}));
    var ItemSlot = Game.ItemSlot;
    var Item = (function () {
        function Item(slot, bonus, element) {
            this.slot = slot;
            this.bonus = bonus;
            this.element = element;
        }
        return Item;
    }());
    Game.Item = Item;
})(Game || (Game = {})); // namespace Game
/// <reference path="Map.ts"/>
/// <reference path="GameBoard.ts"/>
var Game;
(function (Game) {
    var MapLoader = (function () {
        function MapLoader(typeMap) {
            this.typeMap = typeMap;
            this.cellMap = {
                ' ': Game.CellType.None,
                '#': Game.CellType.Block,
                '$': Game.CellType.PlayerSpawnPoint,
                '@': Game.CellType.MonsterSpawnPoint,
                '~': Game.CellType.Water,
                '^': Game.CellType.Lava,
                '%': Game.CellType.Canyon,
                // reserved for future use
                '!': Game.CellType.None,
                '&': Game.CellType.None,
                '*': Game.CellType.None,
                '(': Game.CellType.None,
                ')': Game.CellType.None,
                '_': Game.CellType.None,
                '-': Game.CellType.None,
                '+': Game.CellType.None,
                '=': Game.CellType.None
            };
            this.cellWidth = 100;
            this.cellHeight = 100;
        }
        MapLoader.prototype.loadMap = function (path, gameBoard, callback) {
            var client = new XMLHttpRequest();
            var self = this;
            client.open("GET", path);
            client.onreadystatechange = function () {
                if (client.readyState === 4) {
                    if (client.status === 200) {
                        var params = JSON.parse(client.responseText);
                        var map = new Game.Map(params.width, params.height);
                        gameBoard.objects = new Array();
                        self.parseData(params.data, map, gameBoard);
                        gameBoard.map = map;
                        callback(map);
                    }
                }
            };
            client.send();
        };
        MapLoader.prototype.parseCell = function (cell) {
            return this.cellMap[cell];
        };
        MapLoader.prototype.parseData = function (data, map, gameBoard) {
            var rows = data.split("\n");
            for (var y = 0; y < map.height; y++) {
                var row = rows[y];
                for (var x = 0; x < map.width; x++) {
                    var col = row[x];
                    var cellType = this.parseCell(col);
                    map.cells[x][y] = cellType;
                    if (cellType >= 10) {
                        var obj = this.typeMap.getObject(cellType);
                        if (obj !== undefined) {
                            obj.position = new Game.Vector(x * this.cellWidth, y * this.cellHeight);
                            gameBoard.objects.push(obj);
                        }
                    }
                    else if (cellType === Game.CellType.PlayerSpawnPoint) {
                        map.playerSpawnPoints.push(new Game.Vector(x * this.cellWidth, y * this.cellHeight));
                    }
                    else if (cellType === Game.CellType.MonsterSpawnPoint) {
                        map.monsterSpawnPoints.push(new Game.Vector(x * this.cellWidth, y * this.cellHeight));
                    }
                }
            }
        };
        return MapLoader;
    }());
    Game.MapLoader = MapLoader;
})(Game || (Game = {}));
var Game;
(function (Game) {
    var Player = (function (_super) {
        __extends(Player, _super);
        function Player() {
            var _this = this;
            _super.call(this);
            this.sprite = new Game.Sprite("content/img/sprites/player.png");
            this.sprite.onReady = function (sprite) {
                _this.sprite.width = _this.width;
                _this.sprite.height = _this.height;
                _this.onReady(_this);
            };
            this.affinity = Game.Element.Air;
        }
        Player.prototype.update = function (ticks) {
            if (this.direction !== Game.Direction.None) {
                this.move(ticks, this.direction);
                return true;
            }
            return false;
        };
        Player.prototype.collideWith = function (other) { throw new Error("Not implemented"); };
        return Player;
    }(Game.Creature));
    Game.Player = Player;
})(Game || (Game = {}));
var Game;
(function (Game) {
    var Sprite = (function () {
        function Sprite(path) {
            var _this = this;
            this.width = 100;
            this.height = 100;
            this.offsetX = 0;
            this.offsetY = 0;
            this.numberOfCells = 1;
            this.currentCell = 0;
            this.animationRate = 100;
            this.animationTrim = 0;
            this.onReady = function (sprite) { };
            Game.ImageLoader.instance.loadImage(path, function (img) {
                _this.image = img;
                _this.onReady(_this);
            });
        }
        Sprite.prototype.update = function (ticks) {
            var totalTicks = ticks + this.animationTrim;
            var cellOffset = Math.floor(totalTicks / this.animationRate);
            this.animationTrim = totalTicks % this.animationRate;
            this.currentCell = (this.currentCell + cellOffset) % this.numberOfCells;
        };
        return Sprite;
    }());
    Game.Sprite = Sprite;
})(Game || (Game = {}));
var Game;
(function (Game) {
    var TypeMap = (function () {
        function TypeMap() {
            this.typeMappings = {};
        }
        TypeMap.prototype.setMapping = function (cellType, objectType) {
            this.typeMappings[cellType] = objectType;
        };
        TypeMap.prototype.getMapping = function (cellType) {
            var index = cellType;
            if (index in this.typeMappings) {
                return this.typeMappings[index];
            }
            return undefined;
        };
        TypeMap.prototype.getObject = function (cellType) {
            var mapping = this.getMapping(cellType);
            if (mapping !== undefined) {
                // ReSharper disable once InconsistentNaming
                return new mapping();
            }
            return undefined;
        };
        return TypeMap;
    }());
    Game.TypeMap = TypeMap;
})(Game || (Game = {}));
var Game;
(function (Game) {
    var Vector = (function () {
        function Vector(x, y) {
            this.x = x;
            this.y = y;
        }
        Vector.times = function (k, v) { return new Vector(k * v.x, k * v.y); };
        Vector.minus = function (v1, v2) { return new Vector(v1.x - v2.x, v1.y - v2.y); };
        Vector.plus = function (v1, v2) { return new Vector(v1.x + v2.x, v1.y + v2.y); };
        Vector.dot = function (v1, v2) { return v1.x * v2.x + v1.y * v2.y; };
        Vector.mag = function (v) { return Math.sqrt(v.x * v.x + v.y * v.y); };
        Vector.norm = function (v) {
            var mag = Vector.mag(v);
            var div = (mag === 0) ? Infinity : 1.0 / mag;
            return Vector.times(div, v);
        };
        Vector.getVector = function (dir) {
            switch (dir) {
                case Game.Direction.None:
                    return Vector.empty;
                case Game.Direction.Up:
                    return Vector.up;
                case Game.Direction.Down:
                    return Vector.down;
                case Game.Direction.Left:
                    return Vector.left;
                case Game.Direction.Right:
                    return Vector.right;
            }
            return undefined;
        };
        Vector.empty = new Vector(0, 0);
        Vector.up = new Vector(0, -1);
        Vector.down = new Vector(0, 1);
        Vector.left = new Vector(-1, 0);
        Vector.right = new Vector(1, 0);
        return Vector;
    }());
    Game.Vector = Vector;
})(Game || (Game = {})); // namespace Game
//# sourceMappingURL=game.js.map