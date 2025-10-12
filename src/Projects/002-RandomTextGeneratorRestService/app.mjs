import express from "express";
import {createEndPoints, startService} from "./endpoints.mjs";

if (process.argv.length !== 5) {
    console.log("Wrong number of arguments")
    process.exit(1)
}

const app = express()

createEndPoints(app, parseInt(process.argv[3]), parseInt(process.argv[4]))

startService(app, parseInt(process.argv[2]))
