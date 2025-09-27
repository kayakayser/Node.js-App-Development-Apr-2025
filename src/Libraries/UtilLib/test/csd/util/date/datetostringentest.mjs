import {expect} from "chai";
import mp from "mocha-param";
import {dateToStringEN} from "../../../../csd/util/date/date.mjs";

const dateToStringENCallback = (d) => {
    expect(dateToStringEN(d.d), `dateToStringENCallback error for value: d:${d.d}`).to.equal(d.str)
    expect(d.d.toStringEN(), `dateToStringENCallback error for value: d:${d.d}`).to.equal(d.str)
}

const readData = () => {
    return [
        {d: new Date(2025, 9, 23), str: "Oct 23rd 2025 Thu"},
        {d: new Date(2025, 9, 1), str: "Oct 1st 2025 Wed"},
        {d: new Date(2025, 9, 2), str: "Oct 2nd 2025 Thu"},
        {d: new Date(2025, 9, 3), str: "Oct 3rd 2025 Fri"},
        {d: new Date(2025, 0, 15), str: "Jan 15th 2025 Wed"},
        {d: new Date(2025, 1, 6), str: "Feb 6th 2025 Thu"},
        {d: new Date(2025, 11, 28), str: "Dec 28th 2025 Sun"},
        {d: new Date(2025, 5, 5), str: "Jun 5th 2025 Thu"}
    ]
}

const dateToStringENDescribe = () => {
    const data = readData()

    mp.itParam("dateToStringEN Test", data, dateToStringENCallback)
}

describe("dateToStringEN Test", dateToStringENDescribe)