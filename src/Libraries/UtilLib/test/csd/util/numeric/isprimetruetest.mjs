

import * as assert from "assert";
import {isPrime} from "../../../../csd/util/numeric/numeric.mjs";


const isPrimeTrueTestCallback = () => {
    const input = 2

    assert.equal(isPrime(input), true, "input is prime");
}

const isPrimeTestDescribe = () => {
    describe("isPrime True Test", isPrimeTrueTestCallback)
}

describe("isPrime True Test", isPrimeTestDescribe)
