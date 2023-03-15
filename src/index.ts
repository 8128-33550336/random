import * as crypto from "crypto";

type OptionType = {
    'slash'?: string;
    'plus'?: string;
};

function random(length: number = 32, option: OptionType) {
    return crypto.randomBytes(Math.ceil(length * 3 / 4))
        .toString('base64')
        .slice(0, length)
        .replaceAll('+', '$')
        .replaceAll('/', '_')
        .replaceAll('=', '');
}

export function generate(option: OptionType) {
    return (length: number) => random(length, option);
}

export default random;
