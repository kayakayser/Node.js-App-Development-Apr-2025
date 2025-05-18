import {writeLine} from "./csd/util/console/console.js";
import {randomInt} from "./csd/util/random/random.js";

const sumOfDice = () => randomInt(1, 7) + randomInt(1, 7)

const rollDiceForIndeterminate = v => {
    let total

    while ((total = sumOfDice()) !== 7 && total !== v)
        ;

    return total !== 7
}

const playCraps = () => {
    let total = sumOfDice()

    switch (total) {
        case 7:
        case 11:
            return true
        case 2:
        case 3:
        case 12:
            return false
        default:
            return rollDiceForIndeterminate(total)
    }
}

const calculateCrapsProbability = n => {
    let count = 0

    for (let i = 0; i < n; ++i)
        if (playCraps())
            ++count

    return count / n
}

const main = () => {
    writeLine(`p = ${calculateCrapsProbability(100_000)}`)
}

main()
