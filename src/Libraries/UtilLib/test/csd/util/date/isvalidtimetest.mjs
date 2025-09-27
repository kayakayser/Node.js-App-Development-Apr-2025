import {expect} from "chai";
import mp from "mocha-param";
import {isValidTime} from "../../../../csd/util/date/date.mjs";

const isValidTimeTestCallback = (d) => {
    expect(isValidTime(d.h, d.m, d.s), `isValidTime error for value: h:${d.h} m:${d.m} s:${d.s}`).to.equal(d.status)
}

const readData = () => {
    return [
        {h: 0, m: 0, s: 0, status: true},
        {h: 5, m: 5, s: 25, status: true},
        {h: 15, m: 55, s: 55, status: true},
        {h: 23, m: 59, s: 59, status: true},
        {h: 26, m: 0, s: 0, status: false},
        {h: 0, m: 67, s: 0, status: false},
        {h: 0, m: 0, s: 70, status: false}
    ]
}

const isValidTimeTestDescribe = () => {
    const data = readData()

    mp.itParam("isValidTime Test", data, isValidTimeTestCallback)
}

describe("isValidTime Test", isValidTimeTestDescribe)