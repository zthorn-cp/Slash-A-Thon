/// <reference path="Core.ts"/>
/// <reference path="Sprite.ts"/>
var Game;
(function (Game) {
    var Block = (function () {
        function Block(posX, posY) {
            this.posX = posX;
            this.posY = posY;
            this.isSolid = true;
            this.width = 100;
            this.height = 100;
            this.affinity = Game.Element.Earth;
            this.sprite = new Game.Sprite();
        }
        // blocks don't do anything, they just sit there.
        Block.prototype.update = function (ticks) { };
        Block.prototype.collideWith = function (other) { };
        return Block;
    }());
    Game.Block = Block;
})(Game || (Game = {})); // namespace Game
//# sourceMappingURL=Block.js.map