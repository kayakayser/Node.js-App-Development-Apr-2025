import {Complex} from "./csd/math/Complex.js";
import {writeLine} from "./csd/util/console/console.js";


/*
Single Responsibility
Open closed
Liskov Substitution
Interface Segregation
Dependency Inversion

- dependency ->

- Composition (has a) -> A has a B
- Aggregation (holds a) -> A holds B
- Association -> A use B
- Inheritance (is a) -> A is a B

 */

class Hospital {
    constructor(/*...*/) {
        this._doctors = []
    }

    addDoctor(doctor) {
        this._doctors.push(doctor);
    }

    getDoctor(idx) {
        return this._doctors[idx]
    }

    doAdvertise(advertise) { //association
        //...
    }
    //...
}

class Advertise {
    //...
}

class Doctor {
    //...
}


//Car has an engine
class Plane {
    constructor(count/*, ...*/) {
        this._engines = new Array(count)
        //...

        for (let i = 0; i < count; ++i)
            this._engines[i] = new Engine(/*..*/)
        //...
    }

    //...
}



class Car {
    constructor(/*...*/) {

    }

    static create() {
        const c = new Car()

        c._engine = new Engine()

        return c
    }

    run() {
        this._engine.startEngine()
        //...
        this._engine.stopEngine()
    }

    brake() {
        this._engine.slowEngine()
        //...
    }

    //...
}

class Engine {
    //...
    startEngine() {
        //...
    }

    slowEngine() {
        //...
    }

    stopEngine() {
        //...
    }

    //...
}

function main() {
    const z1 = new Complex(1, 3)
    const z2 = new Complex(1, -3)

    writeLine(z1)
    writeLine(z2)

    Car.prototype._engine = new Engine()
    let c = new Car()

    c.run()
}

main()