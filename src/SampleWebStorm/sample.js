import {MathError} from "./csd/error/MathError.js";
import {writeLine} from "./csd/util/console/console.js";
import {ErrorUtil} from "./csd/util/error/error.js";

class MathUtil {
    static log(value) {
        if (value < 0)
            throw new MathError("Indeterminate", -1)

        if (value === 0)
            throw new MathError("Undefined", 0)

        return Math.log(value)
    }
}

const doSomethingCallback = () => {
    let min = -10
    let max = 10
    let result = MathUtil.log(Math.random() * (max - min) + min)

    writeLine(result)
}

const doSomethingErrorCallback = (ex) => {
    writeLine(`doSomething -> Message:${ex.message}, Error Code:${ex.errCode}`)
    throw ex //rethrow
}


const doSomethingFinallyCallback = () => {
    writeLine("doSomething -> finally")
}

const doSomething = () => ErrorUtil.subscribeWithFinally(doSomethingCallback, doSomethingErrorCallback, doSomethingFinallyCallback)

const main = () => {
    for (let i = 0; i < 100; ++i) {
        try {
            doSomething();
        }
        catch (ex) {
            writeLine(`main-> Message:${ex.message}, Error Code:${ex.errCode}`)
        }
        finally {
            writeLine("main -> finally")
        }
        writeLine("-----------------------------------------------")
    }
}

main()