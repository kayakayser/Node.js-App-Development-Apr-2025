let write = a => process.stdout.write(a)
let writeLine = a => write(a === undefined ? '\n' : `${a}\n`)

export {write, writeLine}