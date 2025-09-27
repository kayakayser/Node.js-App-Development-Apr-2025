import {expect} from "chai";
import mp from "mocha-param";
import {digits} from "../../../../csd/util/numeric/numeric.mjs";

const DigitsTestCallback = (d) => {
    const result = digits(d.a);

    expect(result.length).to.equal(d.response.length);

    for (let i = 0; i < result.length; i++) {
        expect(result[i]).to.equal(d.response[i]);
    }
}

const readData = () => {
    return [
        {a: 3, response: [3]},
        {a: 5, response: [5]},
        {a: 18, response: [1, 8]},
        {a: 123, response: [1, 2, 3]},
        {a: -456, response: [4, 5, 6]},
        {a: 1002, response: [1, 0, 0, 2]},
    ]
}

const digitsTestDescribe = () => {
    const data = readData()

    mp.itParam("digits Test", data, DigitsTestCallback)
}

describe("digits Test", digitsTestDescribe)

