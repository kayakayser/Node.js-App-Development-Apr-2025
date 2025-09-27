import {expect} from "chai";
import mp from "mocha-param";
import {fibonacciNumber} from "../../../../csd/util/numeric/numeric.mjs";

const FibonacciNumberTestCallback = (d) => {
    expect(fibonacciNumber(d.a), `fibonacci number error for value: ${d.a}`).to.equal(d.response)
}

const readData = () => {
    return [
        {a: 3, response: 1},
        {a: 5, response: 3},
        {a: 8, response: 13},
        {a: 12, response: 89},
    ]
}

const fibonacciNumberTestDescribe = () => {
    const data = readData()

    mp.itParam("fibonacciNumber Test", data, FibonacciNumberTestCallback)
}

describe("fibonacciNumber Test", fibonacciNumberTestDescribe)

