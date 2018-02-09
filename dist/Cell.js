"use strict";
exports.__esModule = true;
var Cell = /** @class */ (function () {
    function Cell(alive) {
        this.alive = alive;
    }
    Cell.prototype.isAlive = function () {
        return this.alive;
    };
    Cell.prototype.die = function () {
        return new Cell(false);
    };
    Cell.prototype.live = function () {
        return new Cell(true);
    };
    return Cell;
}());
exports["default"] = Cell;
