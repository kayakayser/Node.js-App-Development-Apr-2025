const g_ones_tr = ["", "bir", "iki", "üç", "dört", "beş", "altı", "yedi", "sekiz", "dokuz"]
const g_tens_tr = ["", "on", "yirmi", "otuz", "kırk", "elli", "altmış", "yetmiş", "seksen", "doksan"]
const g_number_units_tr = ["kentilyon", "katrilyon", "milyar", "milyon", "bin", ""]

const g_ones_en = ["", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"]
const g_tens_en = ["", "ten", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"]
const g_number_units_en = ["quintillion", "quadrillion", "billon", "million", "thousand", ""]

const digitsPowSum = a => {
    let n = a.countDigits()
    let total = 0

    while (a) {
        total += Math.pow(a % 10, n)
        a = Math.trunc(a / 10)
    }

    return total
}

const numToStrTR3D = v => {
    let result =  ""

    v = Math.abs(v)
    const a = Math.trunc(v / 100)
    const b = Math.trunc(v / 10) % 10
    const c = v % 10

    if (a !== 0) {
        if (a !== 1)
            result += g_ones_tr[a]

        result += "yüz"
    }

    result += g_tens_tr[b]
    result += g_ones_tr[c]

    return result
}


Number.prototype.countDigits = function () {return countDigits(this)}

const countDigits = a => !a ? 1 : Math.trunc(Math.log10(Math.abs(a))) + 1

const getDigits = (a, count) => {
    const n = !a ? 1 : Math.trunc(Math.log10(Math.abs(a)) / count) + 1
    const result = new Array(n)
    const divider = Math.trunc(Math.pow(10, count))

    a = Math.abs(a)
    for (let i = n - 1; a !== 0; result[i--] = a % divider, a = Math.trunc(a / divider))
        ;

    return result
}

const digits = a => getDigits(a, 1)

const digitsInTwos = a => getDigits(a, 2)

const digitsInThrees = a => getDigits(a, 3)

const fibonacciNumber = n => {
    if (n <= 2)
        return n - 1

    let prev1 = 1, prev2 = 1, val = 1

    for (let i = 3; i < n; ++i) {
        val = prev1 + prev2

        prev2 = prev1
        prev1 = val
    }

    return val
}

const isEven = a => a % 2 === 0

const isOdd = a => !isEven(a)

const isPrime = a  => {
    if (a <= 1)
        return false

    if (a % 2 === 0)
        return a === 2

    if (a % 3 === 0)
        return a === 3

    if (a % 5 === 0)
        return a === 5

    if (a % 7 === 0)
        return a === 7

    for (let i = 11; i * i <= a; i += 2)
        if (a % i === 0)
            return false

    return true
}

const nextFibonacciNumber = a => {
    if (a < 0)
        return 0

    let prev1 = 1, prev2 = 0, val

    for (;;) {
        val = prev1 + prev2

        if (val > a)
            return val

        prev2 = prev1
        prev1 = val
    }
}

const nthPrime = n => {
    let count = 0
    let i = 2

    for (; count < n; ++i)
        if (isPrime(i))
            ++count
    return i - 1
}

const numToStrTR = a => {
    if (a === 0)
        return "sıfır"

    const threes = digitsInThrees(a)
    let result =  ""
    let idx = g_number_units_tr.length - 1

    for (let i = threes.length - 1; i >= 0; --i)
        result = `${numToStrTR3D(threes[i])}${g_number_units_tr[idx--]}` + result

    return (a < 0 ? "eksi" : "") + result
}

const isArmstrong = a => a >= 0 && a === digitsPowSum(a)

Number.prototype.isPrime = () => isPrime(this)

export {fibonacciNumber, isEven, isOdd, isPrime, countDigits, digits, digitsInTwos, digitsInThrees, nextFibonacciNumber,
    numToStrTR, nthPrime, isArmstrong}