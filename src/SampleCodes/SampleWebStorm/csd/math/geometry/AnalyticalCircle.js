import {Circle} from "./Circle.js";
import {Point} from "./Point.js";

const DELTA = 0.0000001

export class AnalyticalCircle extends Circle {
    constructor(r, x, y) {
        super(r)
        this._center = new Point(x, y)
    }

    get x() {
        return this._center.x
    }

    set x(value) {
        this._center.x = value
    }

    get y() {
        return this._center.y
    }

    set y(value) {
        this._center.y = value
    }

    centerDistance(other) {
        return this._center.euclideanDistance(other)
    }

    isTangent(other) {
        return Math.abs(this.centerDistance(other) - this.radius - other.radius) < DELTA
    }

    toString() {
        return `${super.toString()}, Center:${this._center.toString()}`
    }
}

