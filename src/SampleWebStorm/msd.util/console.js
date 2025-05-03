export const write = a => process.stdout.write(a)
export const writeLine = a => write(a === undefined ? '\n' : `${a}\n`)
