import {randomInt} from "../util/random/random.js";
import {isPrime} from "../util/numeric/numeric.mjs";
import * as events from "node:events";

export class RandomIntGenerator {
    constructor(count, min, max, period) {
        this._count = count
        this._min = min
        this._max = max
        this._period = period
        this._n = 0
        this._event = new events.EventEmitter()
    }

    on(name, action) {
        this._event.on(name, action)
    }

    off(name, action) {
        this._event.off(name, action)
    }

    _randomGeneratorCallback(event) {
        const val = randomInt(this._min, this._max + 1)

        ++this._n
        if (val === 0)
            event.emit("zero")

        if (isPrime(val))
            event.emit("prime", val)

        if (val % 2 === 0)
            event.emit("even", val)
        else
            event.emit("odd", val)

        if (this._count === this._n)
            clearInterval(this._interval)
    }

    run() {
        this._interval = setInterval(() => this._randomGeneratorCallback(this._event), this._period)
    }
}
