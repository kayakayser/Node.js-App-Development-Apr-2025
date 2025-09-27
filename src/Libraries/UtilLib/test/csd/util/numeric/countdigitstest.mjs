import {expect} from "chai";
import mp from "mocha-param";
import {countDigits} from "../../../../csd/util/numeric/numeric.mjs";

const CountDigitsTestCallback = (d) => {
    expect(countDigits(d.a), `countDigits error for value: ${d.a}`).to.equal(d.response)
}

const readData = () => {
    return [
        {a: 45, response: 2},
        {a: 0, response: 1},
        {a: 1, response: 1},
        {a: -1, response: 1},
        {a: -1234, response: 4},
        {a: 19384, response: 5},
        {a: 46382746328462, response: 14},
    ]
}

const countDigitsTestDescribe = () => {
    const data = readData()

    mp.itParam("countDigits Test", data, CountDigitsTestCallback)
}

describe("countDigits Test", countDigitsTestDescribe)

