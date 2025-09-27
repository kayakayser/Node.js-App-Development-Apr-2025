import {expect} from "chai";
import {Random} from "../../../../csd/util/random/random.mjs";


const randomNextBooleanTestCallback = () => {
    let trueValue = 0
    const count = 1_000_000

    for (let i = 0; i < count; ++i) {
        if (Random.nextBoolean())
            trueValue++
    }

    expect(trueValue, "Random.nextBoolean error").to.lessThan(count * 0.51).greaterThan(count * 0.49)
}

const randomNextBooleanTestDescribe = () => {
    it("Random.nextBoolean Test", randomNextBooleanTestCallback)
}

describe("Random.nextBoolean Test", randomNextBooleanTestDescribe)