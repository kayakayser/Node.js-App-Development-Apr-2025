import {expect} from "chai";
import mp from "mocha-param";
import {isLeapYear} from "../../../../csd/util/date/date.mjs";

const isLeapYearTestCallback = (d) => {
    expect(isLeapYear(d.a), `isLeapYear error for value: ${d.a}`).to.equal(d.status)
}

const readData = () => {
    return [
        {a: 2000, status: true},
        {a: 2001, status: false},
        {a: 2004, status: true},
        {a: 2100, status: false}
    ]
}

const isLeapYearTestDescribe = () => {
    const data = readData()

    mp.itParam("isLeapYear Test", data, isLeapYearTestCallback)
}

describe("isLeapYear Test", isLeapYearTestDescribe)
