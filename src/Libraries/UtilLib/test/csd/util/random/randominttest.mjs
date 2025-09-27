import {expect} from "chai";
import {randomInt} from "../../../../csd/util/random/random.mjs";

const randomIntTestCallback = () => {
    const min = 1
    const bound = 100
    const count = 10000

    for (let i = 0; i < count; ++i)
        expect(randomInt(min, bound), "randomInt error").to.lessThan(bound).greaterThanOrEqual(min)
}

const isPrimeTestDescribe = () => {
    it("randomInt Test", randomIntTestCallback)
}

describe("randomInt Test", isPrimeTestDescribe)
