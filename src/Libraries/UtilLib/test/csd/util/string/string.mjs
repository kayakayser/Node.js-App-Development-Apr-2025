import {expect} from "chai";
import {countString, countStringIgnoreCase, padLeading, padTrailing} from "../../../../csd/util/string/string.mjs";

const countStringTestCallback = () => {
    let text1 = "ankara"
    let text2 = "anka"

    expect(countString(text1, text2)).to.equal(1)
}

const countStringTestDescribe = () => {
    it("countString true test", countStringTestCallback)
}

describe("Count string test", countStringTestDescribe)


const countStringIgnoreCaseTestCallback = () => {
    let text1 = "Ankara"
    let text2 = "AnkA"

    expect(countStringIgnoreCase(text1, text2)).to.equal(1)
}

const countStringIgnoreTestDescribe = () => {
    it("countStringIgnoreCase true test", countStringIgnoreCaseTestCallback)
}

describe("Count string ignore case test", countStringIgnoreTestDescribe)


const padLeadingTestCallback = () => {
    let s = "ankara"
    let len = 9
    let str = "x"

    expect(padLeading(s, len, str)).to.be.equal("xxxankara")
}

const padLeadingTestDescribe = () => {
    it("padLeading true test", padLeadingTestCallback)
}

describe("padLeading true test", padLeadingTestDescribe)

const padTrailingTestCallback = () => {
    let s = "ankara"
    let len = 9
    let str = "x"

    expect(padTrailing(s, len, str)).to.be.equal("ankaraxxx")
}

const padTrailingTestDescribe = () => {
    it("padTrailing true test", padTrailingTestCallback)
}

describe("padTrailing true test", padTrailingTestDescribe)