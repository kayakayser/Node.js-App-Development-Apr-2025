import {expect} from "chai";
import {randomBoolean} from "../../../../csd/util/random/random.mjs";


const randomBooleanTestCallback = () => {
    let trueValue = 0
    const count = 1_000_000

    for (let i = 0; i < count; ++i)
        if(randomBoolean())
            trueValue++

    expect(trueValue, "randomBoolean error").to.lessThan(count * 0.51).greaterThan(count * 0.49)
}

const randomBooleanTestDescribe = () => {
    it("randomBoolean Test", randomBooleanTestCallback)
}

describe("randomBoolean Test", randomBooleanTestDescribe)