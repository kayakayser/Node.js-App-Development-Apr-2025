function main() {
    const s = new Sample()

    s.foo().bar()

}

main()


class Sample {
    constructor() {

    }

    foo(action) {
        //...

        return this
    }

    bar() {
        //...

        return this
    }
}