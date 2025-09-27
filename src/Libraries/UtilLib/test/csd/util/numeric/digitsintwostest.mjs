import {expect} from "chai";
import mp from "mocha-param";
import {digitsInTwos} from "../../../../csd/util/numeric/numeric.mjs";

const DigitsInTwosTestCallback = (d) => {
    const result = digitsInTwos(d.a);

    expect(result.length).to.equal(d.response.length);

    for (let i = 0; i < result.length; i++) {
        expect(result[i]).to.equal(d.response[i]);
    }
}

const readData = () => {
    return [
        {a: 3, response: [3]},
        {a: 5, response: [5]},
        {a: 18, response: [18]},
        {a: 123, response: [1, 23]},
        {a: -456, response: [4, 56]},
        {a: 1112, response: [11, 12]},
        {a: -23798504, response: [23, 79, 85, 4]},
    ]
}

const digitsInTwosTestDescribe = () => {
    const data = readData()

    mp.itParam("digitsInTwos Test", data, DigitsInTwosTestCallback)
}

describe("digitsInTwos Test", digitsInTwosTestDescribe)

