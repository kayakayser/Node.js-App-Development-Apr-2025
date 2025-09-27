import {expect} from "chai";
import mp from "mocha-param";
import {numToStrTR} from "../../../../csd/util/numeric/numeric.mjs";

const NumToStrTRTestCallback = (d) => {
    expect(numToStrTR(d.a), `numToStrTR error for value: ${d.a}`).to.equal(d.response)
}

const readData = () => {
    return [
        {a: 1, response: "bir"},
        {a: 3, response: "üç"},
        {a: 4, response: "dört"},
        {a: 10, response: "on"},
        {a: -150, response: "eksiyüzelli"},
        {a: 2538, response: "ikibinbeşyüzotuzsekiz"},
        {a: 2038, response: "ikibinotuzsekiz"},
        {a: 2408, response: "ikibindörtyüzsekiz"},
    ]
}

const numToStrTRTestDescribe = () => {
    const data = readData()

    mp.itParam("numToStrTR Test", data, NumToStrTRTestCallback)
}

describe("numToStrTR Test", numToStrTRTestDescribe)

