import {writeLine} from "../util/console/console";

const check = (a, b) => {
    if (b === 0) {
        if (a === 0)
            throw new Error("Indeterminate")

        throw new Error("Undefined")
    }
}

export class Fraction {
    constructor(numerator, denominator) {
        check(numerator, denominator)
        //...
    }

    set numerator(value) {

    }

    get numerator() {

    }

    set denominator(value) {
        check(this._numerator, value)
        //
    }

    get denominator() {

    }

    get realValue() {

    }

    compareTo(other) {

    }

    equals(other) {

    }

    inc() {

    }

    dec() {

    }

    add(other) {

    }

    addWithInt(value) {

    }

    subtract(other) {

    }

    subtractWithInt(value) {

    }

    multiply(other) {

    }

    multiplyWithInt(value) {

    }

    divide(other) {

    }

    divideWithInt(value) {

    }

    toString() {

    }
}