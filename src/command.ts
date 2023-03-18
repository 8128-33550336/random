#!/usr/bin/env node

import { program } from "commander";
import { generate, number } from ".";

program
    .option('-s <char>')
    .option('-c <count>')
    .option('-n');

program.parse();

const { s, n, c } = program.opts();
const gen: (len: number) => string = (() => {
    if (!n) {
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
    } else {
        if (s) {
            throw new Error('The c option cannot be set when the n option is set.');
        }
        return number;
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
    lengths.push(16);
}

for (const length of lengths) {
    for (let i = 0; i < count; i++) {
        const rand = gen(length);
        console.log(rand);
    }
}
