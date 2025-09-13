import {writeErrLine, writeLine} from "./csd/util/console/console.js";

import {stat, open} from "fs/promises"

const readLines = async () => {
    try {
        const fh = await open(process.argv[2])

        for await (const line of fh.readLines({encoding:"utf-8"}))
            writeLine(line)
    }
    catch (err) {
        writeErrLine(`Error occurred while opening file: ${err.message}`);
    }
}

const doStat = async (stats) => {
    if (!stats.isDirectory())
        await readLines()
    else
        throw new Error(`${process.argv[2]} is a directory`)
}

const main = async () => {
    if (process.argv.length !== 3) {
        writeErrLine("Wrong number of arguments")
        process.exit(1)
    }

    try {
        await doStat(await stat(process.argv[2]))
    }
    catch (err) {
        writeErrLine(`Error occurred:${err.message}`)
    }
}

main()