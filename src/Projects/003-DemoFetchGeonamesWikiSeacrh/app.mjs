import express from "express";
import {createEndPoints, startService} from "./endpoints.mjs";

const app = express()

createEndPoints(app, parseInt(process.argv[3]), parseInt(process.argv[4]))

startService(app, 60600)
