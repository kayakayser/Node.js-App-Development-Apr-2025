export class Random {
    static nextInt(min, bound) {
        return Math.floor(Math.random() * (bound - min) + min)
    }
    static nextNumber(min, bound) {return Math.random() * (bound - min) + min}
    static nextBoolean() {return Math.random() < 0.5}
}

export const randomInt = (min, bound) => Math.floor(Math.random() * (bound - min) + min)
export const randomNumber = (min, bound) => Math.random() * (bound - min) + min
export const randomBoolean = () => Math.random() < 0.5
