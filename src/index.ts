import * as crypto from "crypto";

type OptionType = [string, string];

function random(length: number = 32, option?: OptionType) {
    const [slash = '$', plus = '_'] = option || [];
    return crypto.randomBytes(Math.ceil(length * 3 / 4))
        .toString('base64')
        .slice(0, length)
        .replaceAll('=', '')
        .replaceAll('+', plus)
        .replaceAll('/', slash);
}

export function generate(option?: OptionType) {
    return (length: number) => random(length, option);
}

export function number(digit: number = 8) {
    return (Math.floor(Math.random() * (10 ** digit)) + '').padStart(digit, '0');
};

export function alphabet(length: number = 32) {
    let value = '';
    const A = 0x41; // 'A'.charCodeAt(0)
    for (let i = 0; i < length; i++) {
        value += String.fromCharCode(A + Math.floor(Math.random() * 26));
    }
    return value;
};

export default random;
