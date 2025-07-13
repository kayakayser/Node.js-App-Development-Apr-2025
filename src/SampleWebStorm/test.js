import {padTrailing} from "../util/string/string.js";
import {MathError} from "../error/MathError.js";
import {writeLine} from "../util/console/console.js";

const hasCommonDivider = (num1, num2) => {
    if (num1 % 2 === 0)
        if (num2 % 2 === 0) {
            return 2
        }
    if (num1 % 3 === 0)
        if (num2 % 3 === 0) {
            return 3
        }
    if (num1 % 5 === 0)
        if (num2 % 5 === 0) {
            return 5
        }
    return 0
}
const simplify = (num1, num2) => {
    if (num1 !== 0 && num2 === 0)
        throw new MathError("Indeterminate", -1)

    if (num1 === 0 && num2 !== 0)
        throw new MathError("Undefined", 0)

    let result = 1
    let sArray = [num1, num2]
    while (result = hasCommonDivider(sArray[0], sArray[1])) {
        sArray[0] /= result
        sArray[1] /= result
    }
    if ((sArray[0] < 0 || sArray[0] > 0) && sArray[1] < 0 ){
        sArray[0] *= -1
        sArray[1] *= -1
    }
    return sArray
}
class MathUtil {
    static log(value) {
        if (value < 0)
            throw new MathError("Indeterminate", -1)

        if (value === 0)
            throw new MathError("Undefined", 0)

        return Math.log(value)
    }
}
export class Fraction {
    constructor(numerator, denominator) {
        let f = simplify(numerator, denominator)
        this._num = f[0]
        this._denom = f[1]
    }
    set numerator(value) {
        let f = simplify(value, this._denom)
        this._num = f[0]
        this._denom = f[1]
    }
    get numerator() {
        return this._num
    }
    set denominator(value) {
        let f = simplify(this._num, value)
        this._num = f[0]
        this._denom = f[1]
    }
    get denominator() {
        return this._denom
    }
    compareTo(other) {
        const numXOthDenom = this._num * other.denominator
        const denomXOthNum = this._denom * other.numerator
        if (numXOthDenom > denomXOthNum)
            return 1

        if (numXOthDenom < denomXOthNum)
            return -1
        return 0
    }
    equals(other) {
        return (this._num === other.numerator && this._denom === other.denominator)
    }
    inc() {
        return addWithInt(1)
    }
    dec() {
        return subtractWithInt(1)
    }
    add(other) {
        return new Fraction(this._num * other.denominator + this._denom * other.numerator, this._denom * other.denominator)
    }
    addWithInt(value) {
        return new Fraction(this._num + this._denom * value, this._denom)
    }
    subtract(other) {
        return new Fraction(this._num * other.denominator - this._denom * other.numerator, this._denom * other.denominator)
    }
    subtractWithInt(value) {
        return new Fraction(this._num - this._denom * value, this._denom)
    }
    multiply(other) {
        return new Fraction(this._num * other.numerator, this._denom * other.denominator)
    }
    multiplyWithInt(value) {
        return new Fraction(this._num * value, this._denom)
    }
    divide(other) {
        return new Fraction(this._num * other.denominator, this._denom * other.numerator)
    }
    divideWithInt(value) {
        return new Fraction(this._num, this._denom * value)
    }
    toString() {
        const sep = "."
        const words = "".concat(this._num / this._denom).split(sep)
        const str = "0"

        if (words.length > 1)
            return words[0] + "." + padTrailing(words[1].substring(0, 6), 6, str)
        else
            return padTrailing(words[0] + ".", words[0].length + 1 + 6, str)
    }
}