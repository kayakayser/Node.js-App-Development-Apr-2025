import {randomNumber} from "../util/random/random.js";
import * as events from "node:events";

export class RandomNumberGenerator extends events.EventEmitter {
    constructor(count, min, max, period) {
        super()
        this._count = count
        this._min = min
        this._max = max
        this._period = period
        this._n = 0
    }

    _randomGeneratorCallback(ee) {
        const val = randomNumber(this._min, this._max + 1)

        ++this._n

        if (val > 0)
            ee.emit("positive", val)
        else if (val < 0)
            ee.emit("negative", val)
        else
            ee.emit("zero")

        if (this._count === this._n)
            clearInterval(this._interval)
    }

    run() {
        this._interval = setInterval(() => this._randomGeneratorCallback(this), this._period)
    }
}
