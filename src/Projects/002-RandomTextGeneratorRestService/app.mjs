import express from "express";
import {doEndPoints, startService} from "./endpoints.mjs";

if (process.argv.length !== 4) {
    console.log("Wrong number of arguments")
    process.exit(1)
}

const app = express()

doEndPoints(app, parseInt(process.argv[3]))

startService(app, parseInt(process.argv[2]))
