import {writeLine} from "./csd/util/console/console.js";
import fsp from "fs/promises";

const showInfo = (s) => {
    if (s.isFile())
        writeLine(`Regular file -> Size:${s.size}`);
    else if (s.isDirectory())
        writeLine("Directory");
    else if (s.isFIFO())
        writeLine("Fifo");
    else if (s.isSymbolicLink())
        writeLine("SymbolicLink");
    else if (s.isSocket())
        writeLine("Socket");
    else if (s.isCharacterDevice())
        writeLine("Character Device");
    else if (s.isBlockDevice())
        writeLine("Block Device");
    else
        writeLine("Other")
}

const main = async () => {
    if (process.argv.length !== 3) {
        process.stderr.write("Wrong number of arguments\r\n")
        process.exit(1)
    }

    try {
        const s = await fsp.stat(process.argv[2])

        showInfo(s)
    }
    catch (e) {
        process.stderr.write(`Problem occurred:${e}\r\n`)
    }
}

main()