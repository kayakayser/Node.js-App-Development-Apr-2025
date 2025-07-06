import {write, writeLine} from "./csd/util/console/console.js";
import {RandomPrimeGenerator} from "./csd/random/RandomPrimeGenerator.js";

const main = () => {
    new RandomPrimeGenerator(5, 2, 10000, 300).run((v, s) => write(`${v}${s ? "* " : " "}`))
}

main()