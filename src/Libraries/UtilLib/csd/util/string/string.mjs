import {randomInt} from "../random/random.mjs";

const LETTERS_TR = "abcçdefgğhıijklmnoöprsştuüvyz"
const UPPERCASE_TR = "ABCÇDEFGĞHIİJKLMNOÖPRSŞTUÜVYZ"
const LETTERS_EN = "abcdefghijklmnopqrstuvwxyz"
const UPPERCASE_EN = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
const ALL_LETTERS_TR = LETTERS_TR + UPPERCASE_TR
const ALL_LETTERS_EN = LETTERS_EN + UPPERCASE_EN


export const concatIfNotStarts = (s1, s2) => s1.startsWith(s2) ? s1 : s2 + s1
export const concatIfNotEnds = (s1, s2) => s1.endsWith(s2) ? s1 : s1 + s2

export const countString = (s1, s2) => {
    let count = 0

    for (let idx = -1; (idx = s1.indexOf(s2, idx + 1)) !== -1; ++count)
        ;

    return count
}

export const countStringIgnoreCase = (s1, s2) => countString(s1.toLowerCase(), s2.toLowerCase())

export const randomText = (count, source) => {
    let result = ""

    for (let i = 0; i < count; ++i)
        result += source.charAt(randomInt(0, source.length))

    return result
}

export const padLeading = (s, len, str) => s.length < len ? str.repeat(len - s.length) + s : s

export const padTrailing = (s, len, str) => s.length < len ? s + str.repeat(len - s.length) : s

export const randomTextTR = count => randomText(count, ALL_LETTERS_TR)

export const randomTextEN = count => randomText(count, ALL_LETTERS_EN)

export const randomTexts = (count, min, bound, source) => {
    const result = new Array(count)

    for (let i = 0; i < count; ++i)
        result[i] = randomText(randomInt(min, bound), source)

    return result
}

export const randomTextsTR = (count, min, bound) => randomTexts(count, min, bound, ALL_LETTERS_TR)
export const randomTextsEN = (count, min, bound) => randomTexts(count, min, bound, ALL_LETTERS_EN)
