import {expect} from "chai";
import mp from "mocha-param";
import {getTotalYears} from "../../../../csd/util/date/date.mjs";

const getTotalYearsCallback = (d) => {
    const delta = 0.1
    expect(getTotalYears(d.startdate, d.enddate), `getTotalYearsCallback error for value: startdate:${d.startdate} enddate:${d.enddate}`).to.be.lessThan(d.value + delta ).greaterThan(d.value - delta)
}

const readData = () => {
    return [
        {startdate: new Date(1990, 0, 1, 0, 0, 0, 0), enddate: new Date(1999, 0, 1, 0, 0, 0, 0), value: 9},
        {startdate: new Date(1950, 0, 1, 0, 0, 0, 0), enddate: new Date(2000, 0, 1, 0, 0, 0, 0), value: 50},
        {startdate: new Date(1950, 0, 1, 0, 0, 0, 0), enddate: new Date(2050, 0, 1, 0, 0, 0, 0), value: 100}
    ]
}

const getTotalYearsDescribe = () => {
    const data = readData()

    mp.itParam("getTotalYears Test", data, getTotalYearsCallback)
}

describe("getTotalYears Test", getTotalYearsDescribe)