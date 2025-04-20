function write(a) {
    process.stdout.write(a)
}

function writeLine(a) {
    write(a === undefined ? '\n' : `${a}\n`)
}

function foo(b)
{
    let a = 10

    let f = function (x) {
        writeLine(`a = ${a}`)
        a *= 2
        writeLine(`b = ${b}`)
        b -= 3

        return a + b + x
    }

    writeLine(f(10))
    writeLine(f(10))
    writeLine(`a = ${a}`)
    writeLine(`b = ${b}`)
}

function main() {
    foo(30)
}

main()
