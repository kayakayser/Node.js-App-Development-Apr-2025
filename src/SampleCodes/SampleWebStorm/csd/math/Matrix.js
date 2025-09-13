export class Matrix {
    constructor(row, col) {
        if (row <= 0 || col <= 0)
            throw new Error("row and col must be positive")

        this._row = row
        this._col = col
        this._m = new Array(row * col)
    }

    get row() {
        return this._row
    }

    get col() {
        return this._col
    }

    setElement(i, j, e) {
        this._m[i * this._col + j] = e
    }

    transposed() {
        const r = new Matrix(this._col, this._row)

        for (let i = 0; i < this._row; ++i)
            for (let j = 0; j < this._col; ++j)
                r._m[j * r._col + i] = this._m[i * this._col + j]

        return r
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