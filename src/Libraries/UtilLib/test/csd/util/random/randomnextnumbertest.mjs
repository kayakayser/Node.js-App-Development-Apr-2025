import {expect} from "chai";
import {Random} from "../../../../csd/util/random/random.mjs";


const randomNextNumberTestCallback = () => {
    const min = 1
    const bound = 100
    const count = 10000

    for (let i = 0; i < count; ++i)
        expect(Random.nextNumber(min, bound), "Random.nextNumber error").to.lessThan(bound).greaterThanOrEqual(min)
}

const randomNextNumberTestDescribe = () => {
    it("Random.nextNumber Test", randomNextNumberTestCallback)
}

describe("Random.nextNumber Test", randomNextNumberTestDescribe)