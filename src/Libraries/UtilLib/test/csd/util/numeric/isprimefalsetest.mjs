import * as assert from "assert";
import {isPrime} from "../../../../csd/util/numeric/numeric.mjs";

const isPrimeFalseTestCallback = () => {
    const input = 1

    assert.equal(isPrime(input), false, "input is not prime");
}

const isPrimeTestDescribe = () => {
    describe("isPrime False Test", isPrimeFalseTestCallback)
}

describe("isPrime True Test", isPrimeTestDescribe)
