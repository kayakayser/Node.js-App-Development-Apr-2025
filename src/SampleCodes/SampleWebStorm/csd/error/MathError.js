export class MathError extends Error {
    constructor(message, errCode) {
        super(message)
        this._errCode = errCode
    }

    get errCode() {
        return this._errCode
    }
}