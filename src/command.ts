#!/usr/bin/env node

import { program } from "commander";
import { alphabet, generate, number } from ".";

const defaultLen = 16;

program
    .option('-s <char>')
    .option('-c <count>')
    .option('-n')
    .option('-a');

program.parse();

const { s, c, n, a } = program.opts();
const gen: (len: number) => string = (() => {
    if (!n && !a) {
        const chars: [string, string] | undefined = (() => {
            if (s && typeof s === 'string') {
                if (s.length === 2 && s[0] && s[1]) {
                    return [s[0], s[1]];
                }
                throw new Error('c option must be 2 letters');
            }
            return undefined;
        })();
        return generate(chars);
    } else if (n && !a) {
        if (s) {
            throw new Error('The c option cannot be set when the n option is set.');
        }
        return number;
    } else if (a && !n) {
        if (s) {
            throw new Error('The c option cannot be set when the a option is set.');
        }
        return alphabet;
    } else {
        throw new Error('Both the a and n options cannot be set.');
    }
})();

const count = (() => {
    if (c && typeof c === 'string') {
        const count = +c;
        if (isNaN(count)) {
            throw new Error('count must be number');
        }
        if (count <= 0) {
            throw new Error('count must be plus');
        }
        if (count !== ~~count) {
            throw new Error('count must be int');
        }
        return count;
    }
    return 1;
})();

const lengths = [];

for (const lengthString of program.args) {
    const length = +lengthString;
    if (isNaN(length)) {
        throw new Error('args must be number');
    }
    if (length <= 0) {
        throw new Error('args must be plus');
    }
    if (length !== ~~length) {
        throw new Error('args must be int');
    }
    lengths.push(length);
}

if (lengths.length === 0) {
    lengths.push(defaultLen);
}

for (const length of lengths) {
    for (let i = 0; i < count; i++) {
        const rand = gen(length);
        console.log(rand);
    }
}
