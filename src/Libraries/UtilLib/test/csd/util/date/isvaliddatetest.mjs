import {expect} from "chai";
import mp from "mocha-param";
import {isValidDate} from "../../../../csd/util/date/date.mjs";

const isValidDateTestCallback = (d) => {
    expect(isValidDate(d.d, d.m, d.y), `isValidDate error for value: d:${d.d} m:${d.m} y:${d.y}`).to.equal(d.status)
}

const readData = () => {
    return [
        {d: 15, m: 11, y: 2000, status: true},
        {d: 1, m: 0, y: 2056, status: true},
        {d: 0, m: 0, y: 2056, status: false},
        {d: 29, m: 1, y: 2000, status: true},
        {d: 29, m: 1, y: 2001, status: false},
        {d: 15, m: 14, y: 2001, status: false},
        {d: 45, m: 5, y: 2025, status: false}
    ]
}

const isValidDateTestDescribe = () => {
    const data = readData()

    mp.itParam("isValidDate Test", data, isValidDateTestCallback)
}

describe("isValidDate Test", isValidDateTestDescribe)