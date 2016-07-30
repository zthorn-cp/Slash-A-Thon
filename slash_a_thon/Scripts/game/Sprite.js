var Game;
(function (Game) {
    var Sprite = (function () {
        function Sprite(path) {
            if (path === void 0) { path = undefined; }
            if (path !== undefined) {
                this.load(path);
            }
        }
        Sprite.prototype.load = function (path) {
            this.image = document.createElement("img");
            this.image.src = path;
            this.path = path;
        };
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
//# sourceMappingURL=Sprite.js.map