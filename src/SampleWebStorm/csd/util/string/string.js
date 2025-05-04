import {randomInt} from "../random/random.js";

const LETTERS_TR = "abcçdefgğhıijklmnoöprsştuüvyz"
const UPPERCASE_TR = "ABCÇDEFGĞHIİJKLMNOÖPRSŞTUÜVYZ"
const LETTERS_EN = "abcdefghijklmnopqrstuvwxyz"
const UPPERCASE_EN = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
const ALL_LETTERS_TR = LETTERS_TR + UPPERCASE_TR
const ALL_LETTERS_EN = LETTERS_EN + UPPERCASE_EN


const countString = (s1, s2) => {
    //TODO:
}


const randomText = (count, source) => {
    let result = ""

    for (let i = 0; i < count; ++i)
        result += source.charAt(randomInt(0, source.length))

    return result
}

const randomTextTR = count => randomText(count, ALL_LETTERS_TR)

const randomTextEN = count => randomText(count, ALL_LETTERS_EN)

const randomTexts = (count, min, bound, source) => {
    const result = new Array(count)

    for (let i = 0; i < count; ++i)
        result[i] = randomText(randomInt(min, bound), source)

    return result
}

const randomTextsTR = (count, min, bound) => randomTexts(count, min, bound, ALL_LETTERS_TR)
const randomTextsEN = (count, min, bound) => randomTexts(count, min, bound, ALL_LETTERS_EN)

export {countString, randomText, randomTextTR, randomTextEN, randomTextsTR, randomTextsEN, randomTexts}