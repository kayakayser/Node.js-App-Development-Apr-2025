const write = a => process.stdout.write(a)
const writeLine = a => write(a === undefined ? '\r\n' : `${a}\r\n`)
const writeErr = a => process.stderr.write(a)
const writeErrLine = a => writeErr(a === undefined ? '\r\n' : `${a}\r\n`)

export {write, writeLine, writeErr, writeErrLine, readString}