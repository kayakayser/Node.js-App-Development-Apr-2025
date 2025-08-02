import {writeErrLine, writeLine} from "./csd/util/console/console.js";
import {DirectoryInfo} from "./csd/io/directory/DirectoryInfo.js";

const main = async () => {
    if (process.argv.length !== 3) {
        process.stderr.write("Wrong number of arguments\r\n")
        process.exit(1)
    }

    try {
        const di = new DirectoryInfo(process.argv[2]);
        const totalSize = await di.calculateTotalSize(process.argv[2])

        writeLine(`Total Size:${totalSize}`)
    }
    catch (e) {
        writeErrLine(e.message)
    }
}

main()