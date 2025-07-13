const check = (a, b) => {
    if (b === 0) {
        if (a === 0)
            throw new Error("Indeterminate")

        throw new Error("Undefined")
    }
}

const simplify = (f) => {
    const min = Math.min(Math.abs(f._numerator), f._denominator)

    for (let i = min; i >= 2; --i)
        if (f._numerator % i === 0 && f._denominator % i === 0) {
            f._numerator /= i
            f._denominator /= i
            break
        }
}

const setSign = (f) => {
    if (f._denominator < 0) {
        f._numerator = -f._numerator;
        f._denominator = -f._denominator;
    }
}

const setFraction = (f, a, b) => {
    if (a === 0) {
        f._numerator = 0
        f._denominator = 1
        return
    }

    f._numerator = a
    f._denominator = b

    setSign(f)
    simplify(f)
}

const add = (a1, b1, a2, b2) => {
    return new Fraction(a1 * b2 + a2 * b1, b1 * b2)
}

const subtract = (a1, b1, a2, b2) => {
    return add(a1, b1, -a2, b2)
}

const multiply = (a1, b1, a2, b2) => {
    return new Fraction(a1 * a2, b1 * b2)
}

const divide = (a1, b1, a2, b2) => {
    return multiply(a1, b1, b2, a2)
}

export class Fraction {
    constructor(numerator, denominator) {
        check(numerator, denominator)
        this._numerator = numerator
        this._denominator = denominator
        setFraction(this, numerator, denominator,)
    }

    set numerator(value) {
        setFraction(this, value, this._denominator)
    }

    get numerator() {
        return this._numerator
    }

    set denominator(value) {
        check(this._numerator, value)
        setFraction(this, this._numerator, value)
    }

    get denominator() {
        return this._denominator
    }

    get realValue() {
        return this._numerator / this._denominator
    }

    compareTo(other) {
        return this._numerator * other._denominator - other._numerator * this._denominator
    }

    equals(other) {
        return this._numerator === other._numerator && other._denominator === other._denominator
    }

    inc() {
        this._numerator += this._denominator
    }

    dec() {
        this._numerator -= this._denominator
    }

    add(other) {
        return add(this._numerator, this._denominator, other._numerator, other._denominator)
    }

    addWithInt(value) {
        return add(this._numerator, this._denominator, value, 1)
    }

    subtract(other) {
        return subtract(this._numerator, this._denominator, other._numerator, other._denominator)
    }

    subtractWithInt(value) {
        return subtract(this._numerator, this._denominator, value, 1)
    }

    multiply(other) {
        return multiply(this._numerator, this._denominator, other._numerator, other._denominator)
    }

    multiplyWithInt(value) {
        return multiply(this._numerator, this._denominator, value, 1)
    }

    divide(other) {
        return divide(this._numerator, this._denominator, other._numerator, other._denominator)
    }

    divideWithInt(value) {
        return divide(this._numerator, this._denominator, value, 1)
    }

    toString() {
        const str = this._denominator !== 1 ? ` / ${this._denominator} = ${this.realValue.toFixed(6)}` :  ""

        return `${this._numerator}${str}`
    }
}