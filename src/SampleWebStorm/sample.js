import {randomTextsEN, randomTextsTR, randomTextTR} from "./csd/util/string/string.js";
import {writeLine} from "./csd/util/console/console.js";

const main = () => {
    const a = [1, 2, 3, 4, 5]
    const s = "ankara"

    a.length = 30

    writeLine(`Length: ${a.length}`)
    writeLine(`Length: ${s.length}`)
    writeLine(`Length: ${s.length}`)
}

main()