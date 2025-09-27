import {expect} from "chai";
import mp from "mocha-param";
import {digitsInThrees} from "../../../../csd/util/numeric/numeric.mjs";

const DigitsInThreesTestCallback = (d) => {
    const result = digitsInThrees(d.a);

    expect(result.length).to.equal(d.response.length);

    for (let i = 0; i < result.length; i++) {
        expect(result[i]).to.equal(d.response[i]);
    }
}

const readData = () => {
    return [
        {a: 3, response: [3] },
        {a: 5, response: [5] },
        {a: 8, response: [8] },
        {a: 123, response: [123]},
        {a: -456, response: [456]},
        {a: 1112, response: [1, 112]},
        {a: -34567, response: [34,567]}
    ]
}

const digitsInThreesTestDescribe = () => {
    const data = readData()

    mp.itParam("digitsInThrees Test", data, DigitsInThreesTestCallback)
}

describe("digitsInThrees Test", digitsInThreesTestDescribe)

