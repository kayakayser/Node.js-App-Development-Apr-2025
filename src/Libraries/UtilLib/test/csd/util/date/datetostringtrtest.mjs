import {expect} from "chai";
import mp from "mocha-param";
import {dateToStringTR} from "../../../../csd/util/date/date.mjs";

const dateToStringTRCallback = (d) => {
    expect(dateToStringTR(d.d), `dateToStringTRCallback error for value: d:${d.d}`).to.equal(d.str)
    expect(d.d.toStringTR(), `dateToStringTRCallback error for value: d:${d.d}`).to.equal(d.str)
}

const readData = () => {
    return [
        {d: new Date(2025, 9, 23), str: "23 Ekim 2025 Perşembe"},
        {d: new Date(2025, 9, 1), str: "1 Ekim 2025 Çarşamba"},
        {d: new Date(2025, 9, 2), str: "2 Ekim 2025 Perşembe"},
        {d: new Date(2025, 9, 3), str: "3 Ekim 2025 Cuma"},
        {d: new Date(2025, 0, 15), str: "15 Ocak 2025 Çarşamba"},
        {d: new Date(2025, 1, 6), str: "6 Şubat 2025 Perşembe"},
        {d: new Date(2025, 11, 28), str: "28 Aralık 2025 Pazar"},
        {d: new Date(2025, 5, 5), str: "5 Haziran 2025 Perşembe"},
    ]
}

const dateToStringTRDescribe = () => {
    const data = readData()

    mp.itParam("dateToStringTR Test", data, dateToStringTRCallback)
}

describe("dateToStringTR Test", dateToStringTRDescribe)