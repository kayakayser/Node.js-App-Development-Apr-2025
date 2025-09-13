import {expect} from "chai";
import {isPrime} from "../../../../csd/util/numeric/numeric.mjs";

const isPrimeTrueTestCallback = () => {
    const input = 2

    expect(isPrime(input), "input is prime").to.be.true
}

const isPrimeFalseTestCallback = () => {
    const input = 1

    expect(isPrime(input), "input is not prime").to.be.false
}

const isPrimeTestDescribe = () => {
    it("isPrime True Test", isPrimeTrueTestCallback)
    it("isPrime False Test", isPrimeFalseTestCallback)
}

describe("isPrime Test", isPrimeTestDescribe)
