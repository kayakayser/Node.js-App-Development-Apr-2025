function write(a) {
    process.stdout.write(a)
}

function writeLine(a) {
    write(a === undefined ? '\n' : `${a}\n`)
}

function countDigits(a) {
    return !a ? 1 : Math.trunc(Math.log10(Math.abs(a))) + 1
}

function digitsPowSum(a) {
    let n = countDigits(a)
    let total = 0

    while (a) {
        total += Math.pow(a % 10, n)
        a = Math.trunc(a / 10)
    }

    return total
}

function isArmstrong(a) {
    return a >= 0 && a === digitsPowSum(a)
}

function main() {
    for (let n = 0; n <= 999_999; ++n)
        if (isArmstrong(n))
            writeLine(n)
}

main()