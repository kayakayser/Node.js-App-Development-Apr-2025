import {expect} from "chai";
import {isValidDate, randomDate} from "../../../../csd/util/date/date.mjs";

const TEST_ITERATIONS = 10000
const randomDateTestCallback = () => {
    const count = TEST_ITERATIONS
    for(let i = 0; i < count; ++i) {
        const rd = randomDate()
        expect(isValidDate(rd.getDate(), rd.getMonth(), rd.getFullYear()), `randomDate error`).to.be.true
    }

}

const randomDateTestDescribe = () => {
    it("randomDate Test", randomDateTestCallback)
}

describe("randomDate Test", randomDateTestDescribe)