/// <reference path="Element.ts" />

namespace Game {

    export enum ItemSlot {
        Armor = 1,
        Weapon = 2,
        Helm = 3
    }

    export interface IItem {
        slot: ItemSlot;
        bonus: number;
        element: Element;
    }


    export class Item implements IItem {
        constructor(public slot: ItemSlot, public bonus: number, public element: Element) {
            
        }
    }


}// namespace Game