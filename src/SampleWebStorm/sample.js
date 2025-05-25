import {digitsInThrees} from "./csd/util/numeric/numeric.js";
import {write, writeLine} from "./csd/util/console/console.js";

const main = () => {
    const a = 12_345_678
    const b = 1
    const c = 3_456

    digitsInThrees(a).forEach(v => write(`${v} `))
    writeLine()
    digitsInThrees(b).forEach(v => write(`${v} `))
    writeLine()
    digitsInThrees(c).forEach(v => write(`${v} `))
    writeLine()
}

main()
