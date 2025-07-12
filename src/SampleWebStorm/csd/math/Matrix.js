export class Matrix {
    constructor(row, col) {
        if (row <= 0 || col <= 0)
            throw new Error("row and col must positive")

        this._matrix = new Array(row)
        for (let i = 1; i <= row; ++i)
            this._matrix[i] = new Array(col)
    }

    get row() {
        return this._matrix.length
    }

    get col() {
        return this._matrix[0].length
    }

    setElement(i, j, e) {
        //TODO
    }

    transposed() {
        //TODO: Returns new matrix which is the transpose of "this"
    }

    add(other) {
        //TODO: Returns the sum of two matrices. It is not needed to check that the matrices can be addable.
    }

    subtract(other) {
        //TODO: Returns the difference of two matrices. It is not needed to check that the matrices can be subtractable.
    }

    multiply(other) {
        //TODO: Returns the multiplication of two matrices. It is not needed to check that the matrices can be multiplied.
        //Link: https://en.wikipedia.org/wiki/Matrix_multiplication
    }

    addBy(value) {
        //TODO: add value by all elements
    }

    subtractBy(value) {
        //TODO: subtract value by all elements
    }

    multiplyBy(value) {
        //TODO: multiply value by all elements
    }

    divideBy(value) {
        //TODO: divide value by all elements
    }

    //...
}