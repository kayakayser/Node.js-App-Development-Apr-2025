import {expect} from "chai";
import {randomNumber} from "../../../../csd/util/random/random.mjs";

const randomNumberTestCallback = () => {
    const min = 1
    const bound = 100
    const count = 10000

    for (let i = 0; i < count; ++i)
        expect(randomNumber(min, bound), "randomNumber error").to.lessThan(bound).greaterThanOrEqual(min)
}

const randomNumberTestDescribe = () => {
    it("randomNumber Test", randomNumberTestCallback)
}

describe("randomNumber Test", randomNumberTestDescribe)
