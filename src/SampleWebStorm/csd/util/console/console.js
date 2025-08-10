let write = a => process.stdout.write(a)
let writeLine = a => write(a === undefined ? '\r\n' : `${a}\r\n`)

let writeErr = a => process.stderr.write(a)
let writeErrLine = a => write(a === undefined ? '\r\n' : `${a}\r\n`)

export {write, writeLine, writeErr, writeErrLine}