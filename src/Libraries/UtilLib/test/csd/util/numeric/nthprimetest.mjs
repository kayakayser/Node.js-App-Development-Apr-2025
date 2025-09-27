import {expect} from "chai";
import mp from "mocha-param";
import {nthPrime} from "../../../../csd/util/numeric/numeric.mjs";


const NthPrimeTestCallback = (d) => {
    expect(nthPrime(d.a), `nth Prime number error for value: ${d.a}`).to.equal(d.response)
}

const readData = () => {
    return [
        {a: 1, response: 2},
        {a: 2, response: 3},
        {a: 3, response: 5},
        {a: 4, response: 7},
        {a: 10, response: 29},
        {a: 21, response: 73},
    ]
}

const nthPrimeTestDescribe = () => {
    const data = readData()

    mp.itParam("nthPrime Test", data, NthPrimeTestCallback)
}

describe("nthPrime Test", nthPrimeTestDescribe)

