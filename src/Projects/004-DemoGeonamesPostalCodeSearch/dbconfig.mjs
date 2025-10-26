import {Client} from "pg"

const clientInfoDev = {
    host: "localhost",
    port: 5432,
    user: "postgres",
    password: "csd1993",
    database: "postalcodesearchdb_dev"
}

const clientInfo = {
    host: "localhost",
    port: 5432,
    user: "postgres",
    password: "csd1993",
    database: "postalcodesearchdb"
}

export const clientDev = new Client(clientInfoDev)
export const client = new Client(clientInfo)


