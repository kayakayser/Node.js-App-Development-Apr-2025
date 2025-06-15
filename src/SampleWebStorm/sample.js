import {writeLine} from "./csd/util/console/console.js";
import {AnalyticalCircle} from "./csd/math/geometry/AnalyticalCircle.js";


function main() {
    const ac1 = new AnalyticalCircle(3.32, 100.7, 100)
    const ac2 = new AnalyticalCircle(1.68, 96.7, 103)

    writeLine(ac1.centerDistance(ac2))
    writeLine(ac1.isTangent(ac2))
}

main()