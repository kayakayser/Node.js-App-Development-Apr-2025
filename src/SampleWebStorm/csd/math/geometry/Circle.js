export class Circle {
    constructor(r) {
        this.radius = r
    }

    set radius(r) {
        if (r < 0)
            throw new Error("Radius can not be negative")
        this._r = r
    }

    get radius() {
        return this._r
    }

    get area() {
        return Math.PI * this._r * this._r
    }

    get circumference() {
        return 2 * Math.PI * this._r
    }

    toString() {
        return `Radius: ${this._r}, Area: ${this.area}, Circumference: ${this.circumference}`
    }
}

