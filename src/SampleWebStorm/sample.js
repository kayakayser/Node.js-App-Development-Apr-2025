import {writeLine} from "./csd/util/console/console.js";
import {randomInt} from "./csd/util/random/random.js";

const doWork = timeout => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            let val = randomInt(-10, 10)

            writeLine(`val = ${val}`)

            if (val > 0)
                resolve(val)
            else
                reject(new Error(`not positive value:${val}`))
        }, timeout)
    })
}

async function main() {
    doWork(2000).then(v => writeLine(`resolve -> val = ${v}`)).catch(e => writeLine(`reject -> ${e.message}`))
}

main()

writeLine("main ends!...")