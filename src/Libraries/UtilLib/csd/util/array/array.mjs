import {randomInt, randomNumber} from "../random/random.mjs";

const join = (a, sep) => a.reduce((s, e) => s + sep + e)

const randomIntArray = (n, min, bound) => {
    const a = new Array(n)

    for (let i = 0; i < n; ++i)
        a[i] = randomInt(min, bound)

    return a
}

const randomNumberArray = (n, min, bound) => {
    const a = new Array(n)

    for (let i = 0; i < n; ++i)
        a[i] = randomNumber(min, bound)

    return a
}

export  {join, randomIntArray, randomNumberArray}