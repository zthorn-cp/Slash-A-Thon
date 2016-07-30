/// <reference path="../Sprite.ts"/>
/// <reference path="../../typings/qunit/qunit.d.ts"/>

namespace Game.UnitTests {

    QUnit.module("Sprite.ts tests");

    test("Update Carries Over Ticks And Updates Cells", () => {
        // Arrange
        const sprite = new Game.Sprite();
        sprite.numberOfCells = 3;
        sprite.currentCell = 1;
        sprite.animationRate = 100;
        sprite.animationTrim = 10;

        const updateTicks = 120;

        // Act
        sprite.update(updateTicks);

        // Assert
        equal(sprite.currentCell, 2, "Expected currentCell to advance by 1");
        equal(sprite.animationTrim, 30, "Expected animation trim to roll over by 20");

    });

    test("Update Carries Rolls Over Excess Cells", () => {
        // Arrange
        const sprite = new Game.Sprite();
        sprite.numberOfCells = 3;
        sprite.currentCell = 2;
        sprite.animationRate = 100;
        sprite.animationTrim = 10;

        const updateTicks = 120;

        // Act
        sprite.update(updateTicks);

        // Assert
        equal(sprite.currentCell, 0, "Expected currentCell to roll back to 0");
        equal(sprite.animationTrim, 30, "Expected animation trim to roll over by 20");

    });

    test("Update Carries Rolls Over Excess Cells When Trim is High", () => {
        // Arrange
        const sprite = new Game.Sprite();
        sprite.numberOfCells = 3;
        sprite.currentCell = 2;
        sprite.animationRate = 100;
        sprite.animationTrim = 90;

        const updateTicks = 120;

        // Act
        sprite.update(updateTicks);

        // Assert
        equal(sprite.currentCell, 1, "Expected currentCell to roll back to 0");
        equal(sprite.animationTrim, 10, "Expected animation trim to roll over by 210");

    });

    test("Load loads new image", () => {
        // Arrange
        const filePath = "/content/img/sprites/block_basic.png";

        const sprite = new Game.Sprite();

        // Act
        sprite.load(filePath);

        // Assert
        equal(sprite.image.src, filePath, "Sprite did not load the selected file");
    });
}