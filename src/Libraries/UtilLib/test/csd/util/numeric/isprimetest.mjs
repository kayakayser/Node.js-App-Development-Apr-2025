

import * as assert from "assert";
import {isPrime} from "../../../../csd/util/numeric/numeric.mjs";


const isPrimeTrueTest1Callback = () => {
    const input = 2

    assert.equal(isPrime(input), true, "input is prime");
}

const isPrimeFalseTest1Callback = () => {
    const input = 1

    assert.equal(isPrime(input), false, "input is not prime");
}

const isPrimeTestDescribe = () => {
    beforeEach(() => console.info("Before each test"))
    afterEach(() => console.info("After each test"))
    describe("isPrime True Test1", isPrimeTrueTest1Callback)
    describe("isPrime False Test1", isPrimeFalseTest1Callback)
}

describe("isPrime Tests", isPrimeTestDescribe)
