import {clientDev} from "./dbconfig.mjs";

const connect = async () => {
    try {
        await clientDev.connect()
    } catch (e) {
        console.log(`Connection Error:{e.message}`)
        throw e
    }
}

const getPostalCodeInfoQuery = "select placeName, adminName1, lat, lng from postal_code_info where postal_code = $1"
const insertPostalCodesQuery = "insert into postal_codes (code) values ($1)"
const insertPostalCodeInfoQuery = "insert into postal_code_info (postal_code, adminCode2, adminCode1, adminName2, lng, lat, countryCode, adminName1, placeName) values ($1, $2, $3, $4, $5, $6, $7, $8, $9)"

export const getPostalCodeInfo = async (postalCode) => {
    const res = await clientDev.query(getPostalCodeInfoQuery, [postalCode])

    return res
}

export const insertPostalCode = async (postalCode) => {
    await clientDev.query(insertPostalCodesQuery, [postalCode])
}

export const insertPostalCodeInfo = async (info) => {
    const values = [
        info.postalCode, info.adminCode2, info.adminCode1, info.adminName2, info.lng, info.lat, info.countryCode, info.adminName1, info.placeName
    ]
    await clientDev.query(insertPostalCodeInfoQuery, values)
}

const insertPostalCodeTest = async (postalCode) => {
    try {
        const data = {
            "postalCode": "67000",
            "adminCode2": "34-01",
            "adminCode1": "34",
            "adminName2": "Fatih",
            "lng": 28.9675,
            "lat": 41.0128,
            "countryCode": "TR",
            "adminName1": "Istanbul",
            "placeName": "Fatih"
        }
        await connect()
        //await insertPostalCode(postalCode)
        //await insertPostalCodeInfo(data)
        console.log((await getPostalCodeInfo(postalCode)).rows)
    }
    catch (e) {
        console.log("Error inserting postal code info:", e)
    }
}

await insertPostalCodeTest("67000")