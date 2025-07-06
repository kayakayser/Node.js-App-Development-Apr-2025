import {randomInt} from "../util/random/random.js";
import {isPrime} from "../util/numeric/numeric.js";

export class RandomPrimeGenerator {
    constructor(count, min, max, period) {
        this._count = count
        this._min = min
        this._max = max
        this._period = period
        this._n = 0
    }

    randomGeneratorCallback(action) {
        const val = randomInt(this._min, this._max + 1)

        if (isPrime(val)) {
            action(val, true)
            ++this._n
        }
        else
            action(val, false)

        if (this._count === this._n)
            clearInterval(this._interval)
    }

    run(action) {
        this._interval = setInterval(() => this.randomGeneratorCallback(action), this._period)
    }
}
