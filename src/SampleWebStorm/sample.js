let write = a => process.stdout.write(a)
let writeLine = a => write(a === undefined ? '\n' : `${a}\n`)

let countValue = (a, pred) => {
    let count = 0

    a.forEach(e => {if (pred(e)) ++count})

    return count
}

let main = () => {
    let a = [1, 2, 4, 3, -5, 4, 9, 3]

    writeLine(countValue(a, v => v % 2 === 0))
    writeLine(countValue(a, v => v === 4))
    writeLine(countValue(a, v => v === 67))
}

main()