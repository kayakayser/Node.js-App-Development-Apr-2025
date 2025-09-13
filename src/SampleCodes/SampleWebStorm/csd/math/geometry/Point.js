import {randomInt, randomNumber} from "../../util/random/random.js";

const euclideanDistance = (x1, y1, x2, y2)  => {
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2))
}

export class Point {
    constructor(x, y) {
        this.x = x
        this.y = y
    }

    euclideanDistance(other) {
        return euclideanDistance(this.x, this.y, other.x, other.y)
    }

    offset(dx, dy) {this.x += dx; this.y += dy}

    toString() {return `(${this.x}, ${this.y})`}
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