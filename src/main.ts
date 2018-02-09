import * as process from 'process';
import * as readline from 'readline';

import World from './World';

const stream = process.stdout;


function nextRound(world) {
    stream.write('\n\n\n\n');
    world.getGrid().forEach((line) => {
        line.forEach(
            cell => stream.write(cell.isAlive() ? '\u2588' : ' ')
        );
        stream.write('\n');
    });
    world.next();

    setTimeout(() => nextRound(world), 500);
}

nextRound(World.buildRandom(200, 70));
