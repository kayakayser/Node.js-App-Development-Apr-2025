import {writeErrLine, writeLine} from "./csd/util/console/console.js";

import {writeFile} from "fs"

const main = () => {
    if (process.argv.length !== 4) {
        writeErrLine("Wrong number of arguments")
        process.exit(1)
    }

    writeFile(process.argv[2], process.argv[3] + "\r\n", {flag: "a"}, e => {
        if (!e)
            writeLine("Data written successfully")
        else
            writeErrLine(`Error occurred:${e.message}`)
    })
}

main()