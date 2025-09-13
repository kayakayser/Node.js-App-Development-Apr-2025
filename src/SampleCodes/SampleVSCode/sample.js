function main() {
    foo();
}

function foo() {
    {
        let a = 20
        var a = 10 //error
    }

    console.log(a)
}

main()