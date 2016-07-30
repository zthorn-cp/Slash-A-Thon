var Game;
(function (Game) {
    var Direction;
    (function (Direction) {
        Direction[Direction["None"] = 0] = "None";
        Direction[Direction["Up"] = 1] = "Up";
        Direction[Direction["Right"] = 2] = "Right";
        Direction[Direction["Down"] = 3] = "Down";
        Direction[Direction["Left"] = 4] = "Left";
    })(Direction || (Direction = {}));
    (function (Element) {
        Element[Element["Earth"] = 1] = "Earth";
        Element[Element["Water"] = 2] = "Water";
        Element[Element["Air"] = 4] = "Air";
        Element[Element["Fire"] = 8] = "Fire";
    })(Game.Element || (Game.Element = {}));
    var Element = Game.Element;
    var GameBoard = (function () {
        function GameBoard(width, height) {
            this.width = width;
            this.height = height;
            // public members
            this.objects = new Array();
            this.canvas = document.createElement("canvas");
            document.body.appendChild(this.canvas);
            this.context = this.canvas.getContext("2d");
        }
        GameBoard.prototype.drawSprite = function (sprite, posX, posY) {
            this.context.clearRect(posX, posY, sprite.width, sprite.height);
            this.context.drawImage(sprite.image, sprite.offsetX, sprite.offsetY, sprite.width, sprite.height, posX, posY, sprite.width, sprite.height);
        };
        GameBoard.prototype.update = function (ticks) {
            var didUpdate = new Array();
            for (var _i = 0, _a = this.objects; _i < _a.length; _i++) {
                var object = _a[_i];
                if (object.update(ticks)) {
                    didUpdate.push(object);
                }
            }
            for (var _b = 0, didUpdate_1 = didUpdate; _b < didUpdate_1.length; _b++) {
                var object = didUpdate_1[_b];
                this.drawSprite(object.sprite, object.posX, object.posY);
            }
            return true;
        };
        GameBoard.prototype.run = function () {
            var lastTick = new Date().getTime();
            while (this.isRunning) {
                var thisTick = new Date().getTime();
                var tickOffset = thisTick - lastTick;
                lastTick = thisTick;
                this.isRunning = this.update(tickOffset);
            }
        };
        return GameBoard;
    }());
    function startGame() {
        var gameBoard = new GameBoard(1000, 500);
        gameBoard.run();
    }
})(Game || (Game = {}));
//# sourceMappingURL=Core.js.map