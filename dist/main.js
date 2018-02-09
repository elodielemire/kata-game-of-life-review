"use strict";
exports.__esModule = true;
var process = require("process");
var World_1 = require("./World");
var stream = process.stdout;
function nextRound(world) {
    stream.write('\n\n\n\n');
    world.getGrid().forEach(function (line) {
        line.forEach(function (cell) { return stream.write(cell.isAlive() ? '\u2588' : ' '); });
        stream.write('\n');
    });
    world.next();
    setTimeout(function () { return nextRound(world); }, 500);
}
nextRound(World_1["default"].buildRandom(200, 70));
