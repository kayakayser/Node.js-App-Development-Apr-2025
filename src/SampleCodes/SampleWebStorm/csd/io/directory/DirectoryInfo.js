import fsp from "fs/promises";
import p from "path";
import fs from "fs";

export class DirectoryInfo {
    constructor(path) {
        this._path = path
        let e = null
        fs.stat(path, (ex, s) => {if (ex) e = ex; else if (!s.isDirectory()) e = new Error(`${path} is not a directory`)})

        if (e)
            throw e
    }

    async calculateTotalSize() {
        const dir = await fsp.opendir(this._path, { recursive: true })
        let totalSize = 0

        for await (const entry of dir) {
            const s = await fsp.stat(p.resolve(entry.parentPath, entry.name))

            if (!s.isDirectory())
                totalSize += s.size;
        }

        return totalSize
    }

    get path() {
        return this._path
    }

    //...
}