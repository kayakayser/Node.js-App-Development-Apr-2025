function writeln(a) {
    console.log(a)
}

function reverse(a) {
    let result = 0

    while (a) {
        result = result * 10 + a % 10
        a = Math.trunc(a / 10)
    }

    return result
}

function main() {
    writeln(reverse(123456789))
    writeln(reverse(-123456789))
    writeln(reverse(1234567890))
    writeln(reverse(-1234567890))
    writeln(reverse(0))
}
main()