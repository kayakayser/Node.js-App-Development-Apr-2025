import {write, writeLine} from "./msd.util/console.js";
import {randomBoolean, randomInt, randomNumber} from "./csd/util/random/random.js";

const main = () => {
    let min = 10, max = 20

    for (let i = 0; i < 10; ++i)
        write(`${randomInt(min, max)} `)

    writeLine()
    for (let i = 0; i < 10; ++i)
        write(`${randomNumber(min, max)} `)

    writeLine()
    for (let i = 0; i < 10; ++i)
        write(`${randomBoolean(min, max)} `)
}

main()