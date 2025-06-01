export class Complex {
    constructor(real, imaginary) {
        this._real = real;
        this._imaginary = imaginary;
    }

    get real() {
        return this._real;
    }

    set real(value) {
        this._real = value;
    }

    get imaginary() {
        return this._imaginary;
    }

    set imaginary(value) {
        this._imaginary = value;
    }

    get norm() {
        //TODO
    }

    get conjugate() {
        //TODO
    }

    add(other) {
        //TODO
    }

    subtract(other) {
        //TODO
    }

    multiply(other) {
        //TODO
    }

    divide(other) {
        //TODO
    }
}
