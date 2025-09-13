import {write, writeErrLine, writeLine} from "./csd/util/console/console.js";
import fsp from "fs/promises";
import p from "path";

let totalSize = 0

const setTotalSize = async (path) => {
    try {
        const s = await fsp.stat(path)

        if (!s.isDirectory())
            totalSize += s.size;
    }
    catch (e) {
        writeErrLine(`Problem occurred in stat: ${e.message}`)
    }
}

const walkDirectory = async (path) => {
    try {
        const dir = await fsp.opendir(path, { recursive: true })

        for await (const entry of dir)
            await setTotalSize(p.resolve(entry.parentPath, entry.name));
    }
    catch (e) {
        writeErrLine(`Problem occurred in opendir:${e.message}`)
    }
}

const main = async () => {
    if (process.argv.length !== 3) {
        process.stderr.write("Wrong number of arguments\r\n")
        process.exit(1)
    }

    try {
        await fsp.access(process.argv[2])
        await walkDirectory(process.argv[2])

        writeLine(`Total Size:${totalSize}`)
    }
    catch (ex) {
        writeErrLine(`'${process.argv[2]}' not exists`)
    }
}

main()