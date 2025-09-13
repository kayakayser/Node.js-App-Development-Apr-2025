import {expect} from "chai";
import mp from "mocha-param";
import {isPrime} from "../../../../csd/util/numeric/numeric.mjs";

const isPrimeTestCallback = (d) => {
    expect(isPrime(d.a), `isPrime error for value: ${d.a}`).to.equal(d.status)
}

const readData = () => {
    return [
        {a: 19, status: true},
        {a: 0, status: false},
        {a: 1, status: false},
        {a: -1, status: false}
    ]
}

const isPrimeTestDescribe = () => {
    const data = readData()

    mp.itParam("isPrime Test", data, isPrimeTestCallback)
}

describe("isPrime Test", isPrimeTestDescribe)
