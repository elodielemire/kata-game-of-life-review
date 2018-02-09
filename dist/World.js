"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var Cell_1 = require("./Cell");
var CellsLengthNotMultipleOfColumnsCount = /** @class */ (function (_super) {
    __extends(CellsLengthNotMultipleOfColumnsCount, _super);
    function CellsLengthNotMultipleOfColumnsCount() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return CellsLengthNotMultipleOfColumnsCount;
}(RangeError));
var World = /** @class */ (function () {
    function World(columns, cells) {
        this.cells = cells;
        this.columns = columns;
        if (cells.length % columns !== 0) {
            var msg = "You provided " + this.cells.length + " cells but it has to be a multiple of " + this.columns;
            throw new World.CellsLengthNotMultipleOfColumnsCount(msg);
        }
    }
    World.buildRandom = function (colums, lines) {
        var cells = Array(colums * lines).fill(null).map(function () {
            var probability = 0.5;
            var willBeAlive = Math.random() > probability;
            return new Cell_1["default"](willBeAlive);
        });
        return new World(colums, cells);
    };
    World.prototype.getSize = function () {
        return this.cells.length;
    };
    World.prototype.getGrid = function () {
        var _this = this;
        return this.cells.reduce(function (acc, currCell, index) {
            if (index % _this.columns === 0) {
                // create a new line
                return acc.concat([[currCell]]);
            }
            var lastLineIndex = acc.length - 1;
            var lastLine = acc[lastLineIndex];
            //push a new cell to the last line
            return acc.slice(0, lastLineIndex).concat([
                lastLine.concat([currCell])
            ]);
        }, []);
    };
    World.prototype.getNeighbors = function (cellIndex) {
        var cellToTest = this.cells[cellIndex];
        var cellTop = this.cells[cellIndex - this.columns];
        var cellBottom = this.cells[cellIndex + this.columns];
        var cellLeft = (cellIndex % this.columns !== 0) && this.cells[cellIndex - 1];
        var cellRight = (cellIndex % this.columns !== this.columns - 1) && this.cells[cellIndex + 1];
        var cellTopLeft = (cellTop && cellLeft) && this.cells[cellIndex - this.columns - 1];
        var cellTopRight = (cellTop && cellRight) && this.cells[cellIndex - this.columns + 1];
        var cellBottomLeft = (cellBottom && cellLeft) && this.cells[cellIndex + this.columns - 1];
        var cellBottomRight = (cellBottom && cellRight) && this.cells[cellIndex + this.columns + 1];
        return [
            cellTop,
            cellBottom,
            cellLeft,
            cellRight,
            cellTopLeft,
            cellTopRight,
            cellBottomLeft,
            cellBottomRight
        ].filter(Boolean);
    };
    World.prototype.getAliveNeighbors = function (cellIndex) {
        return this.getNeighbors(cellIndex).filter(function (cell) { return cell instanceof Cell_1["default"] && cell.isAlive(); });
    };
    World.prototype.next = function () {
        var _this = this;
        this.cells = this.cells.map(function (cell, index) {
            switch (_this.getAliveNeighbors(index).length) {
                case 3:
                    return cell.live();
                case 2:
                    return cell;
                default:
                    return cell.die();
            }
        });
    };
    World.CellsLengthNotMultipleOfColumnsCount = CellsLengthNotMultipleOfColumnsCount;
    return World;
}());
exports["default"] = World;
