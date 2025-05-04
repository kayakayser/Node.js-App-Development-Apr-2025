import {writeLine} from "./csd/util/console/console.js";
import {countString} from "./csd/util/string/string";

const main = () => {
    const s1 = "Bugün hava çok güzel. Bu çok güzel havada ders mi yapılır"
    const s2 = "çok"

    writeLine(countString(s1, s2) === 2)
}

main()