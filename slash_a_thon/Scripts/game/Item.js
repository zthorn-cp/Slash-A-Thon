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
//# sourceMappingURL=Item.js.map