import {expect} from "chai";
import {Random} from "../../../../csd/util/random/random.mjs";


const randomNextIntTestCallback = () => {
    const min = 1
    const bound = 100
    const count = 10000

    for (let i = 0; i < count; ++i)
        expect(Random.nextInt(min, bound), "Random.nextInt error").to.lessThan(bound).greaterThanOrEqual(min)
}

const randomNextIntTestDescribe = () => {
    it("Random.nextInt Test", randomNextIntTestCallback)
}

describe("Random.nextInt Test", randomNextIntTestDescribe)