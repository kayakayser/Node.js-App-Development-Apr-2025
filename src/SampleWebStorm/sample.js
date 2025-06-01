import {Circle} from "./csd/math/geometry/Circle.js";
import {writeLine} from "./csd/util/console/console.js";

function main() {
    const c1 = new Circle(-12)
    const c2 = new Circle(12)

    writeLine(`Radius of c1: ${c1.radius}, Circumference: ${c1.circumference}, Area: ${c1.area}`)
    writeLine(`Radius of c1: ${c2.radius}, Circumference: ${c2.circumference}, Area: ${c2.area}`)

    c1.radius = -3

    writeLine(`Radius of c1: ${c1.radius}, Circumference: ${c1.circumference}, Area: ${c1.area}`)
}

main()