import {Random} from "./csd/util/random/random.js";
import {writeLine, write} from "./csd/util/console/console.js";

const main = () => {
    for (let i = 0; i < 10; ++i)
        write(Random.nextInt(1, 100) + " ")

    writeLine("\n-------------------------------------")

    for (let i = 0; i < 10; ++i)
        writeLine(Random.nextNumber(3.4, 7.789))

    writeLine("\n-------------------------------------")

    for (let i = 0; i < 10; ++i)
        writeLine(Random.nextBoolean())
}

main()