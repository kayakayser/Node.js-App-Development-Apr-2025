import {randomInt, randomNumber} from "../../util/random/random.js";

export const Point = function(x, y) {
    this.x = x
    this.y = y
    this.euclideanDistance = function(other) {
        return Math.sqrt(Math.pow(this.x - other.x, 2) + Math.pow(this.y - other.y, 2))
    }
    this.offset = function(dx, dy) {this.x += dx; this.y += dy}
    this.toString = function () {return `(${this.x}, ${this.y})`}
}

export const randomIntPoint = (min, bound) => new Point(randomInt(min, bound), randomInt(min, bound))

export const randomIntPoints = (n, min, bound) => {
    let points = new Array(n)
    for (let i = 0; i < n; i++)
        points[i] = randomIntPoint(min, bound)

    return points
}

export const randomPoint = (min, bound) => new Point(randomNumber(min, bound), randomNumber(min, bound))

export const randomPoints = (n, min, bound) => {
    let points = new Array(n)
    for (let i = 0; i < n; i++)
        points[i] = randomPoint(min, bound)

    return points
}