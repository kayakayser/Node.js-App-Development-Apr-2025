const digitsPowSum = a => {
    let n = a.countDigits()
    let total = 0

    while (a) {
        total += Math.pow(a % 10, n)
        a = Math.trunc(a / 10)
    }

    return total
}

Number.prototype.countDigits = () => !this ? 1 : Math.trunc(Math.log10(Math.abs(this))) + 1

const countDigits = a => !a ? 1 : Math.trunc(Math.log10(Math.abs(a))) + 1

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

const isPrime = a  =>{
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

const isArmstrong = a => a >= 0 && a === digitsPowSum(a)

Number.prototype.isPrime = () => isPrime(this)

export {fibonacciNumber, isEven, isOdd, isPrime, countDigits, nextFibonacciNumber, nthPrime, isArmstrong}