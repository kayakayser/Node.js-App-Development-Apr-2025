import {expect} from "chai";
import mp from "mocha-param";
import {nextFibonacciNumber} from "../../../../csd/util/numeric/numeric.mjs";

const NextFibonacciNumberTestCallback = (d) => {
    expect(nextFibonacciNumber(d.a), `nextFibonacci number error for value: ${d.a}`).to.equal(d.response)
}

const readData = () => {
    return [
        {a: 3, response: 5},
        {a: 5, response: 8},
        {a: 8, response: 13},
        {a: 55, response: 89},
        {a: 377, response: 610},
    ]
}

const nextFibonacciNumberTestDescribe = () => {
    const data = readData()

    mp.itParam("nextFibonacciNumber Test", data, NextFibonacciNumberTestCallback)
}

describe("nextFibonacciNumber Test", nextFibonacciNumberTestDescribe)

