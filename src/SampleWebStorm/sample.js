let write = a => process.stdout.write(a)
let writeLine = a => write(a === undefined ? '\n' : `${a}\n`)

let Product = function (name, price, stock) {
    this.name = name
    this.price = price
    this.stock = stock
    this.getTotal =  function () {return this.stock * this.price }
    this.toString = function () {return this.name}
}

function foo(x, ...args) {
    writeLine(`x = ${x}`)
    writeLine(`Length:${args.length}`)
    for (let arg of args)
        write(`${arg} `)
    writeLine()
}

function bar(x) {
    writeLine(`x = ${x}`)
    writeLine(`Length:${arguments.length}`)
    for (let i = 1; i < arguments.length; ++i)
        write(`${arguments[i]} `)
    writeLine()
}


let main = () => {
    foo(10, 20, 30)
    bar(10, 20, 30)
}

main()