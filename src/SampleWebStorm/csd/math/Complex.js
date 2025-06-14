const add = (re1, im1, re2, im2) =>  new Complex(re1 + re2, im1 + im2)
const subtract = (re1, im1, re2, im2) =>  add(re1, im1, -re2, -im2)
const multiply = (re1, im1, re2, im2) =>  {/*TODO*/}
const divide = (re1, im1, re2, im2) =>  {/*TODO*/}

export class Complex {
    constructor(real, imaginary) {
        this._real = real
        this._imaginary = imaginary
    }

    get real() {
        return this._real
    }

    set real(value) {
        this._real = value
    }

    get imaginary() {
        return this._imaginary
    }

    set imaginary(value) {
        this._imaginary = value
    }

    get norm() {
        return Math.sqrt(this._real * this._real + this._imaginary * this._imaginary)
    }

    get conjugate() {
        return new Complex(this._real, -this._imaginary)
    }

    add(other) {
        return add(this._real, this.imaginary, other._real, other._imaginary)
    }

    subtract(other) {
        return subtract(this._real, this.imaginary, other._real, other._imaginary)
    }

    multiply(other) {
        return multiply(this._real, this.imaginary, other._real, other._imaginary)
    }

    divide(other) {
        return divide(this._real, this.imaginary, other._real, other._imaginary)
    }

    negate() {
        return new Complex(-this._real, -this._imaginary)
    }

    toString() {
        const imText = (this._imaginary < 0) ?  (` - i * ${Math.abs(this._imaginary)}`) : (` + i * ${this._imaginary}`)

        return `${this._real}${imText}`
    }
}
