import {clientDev} from "./dbconfig.mjs";

const connect = async () => {
    try {
        await clientDev.connect()
    } catch (e) {
        console.log(`Connection Error:${e.message}`)
        throw e
    }
}

const getPostalCodeInfoQuery = "select placeName, adminName1, lat, lng from postal_code_info where postal_code = $1"
const insertPostalCodesQuery = "insert into postal_codes (code) values ($1)"
const insertPostalCodeInfoQuery = "insert into postal_code_info (postal_code, adminCode2, adminCode1, adminName2, lng, lat, countryCode, adminName1, placeName) values ($1, $2, $3, $4, $5, $6, $7, $8, $9)"

const insertCode = async (postalCode) => {
    await clientDev.query(insertPostalCodesQuery, [postalCode])
}

const insertCodeInfo = async (info) => {
    const values = [
        info.postalcode, info.adminCode2, info.adminCode1, info.adminName2, info.lng, info.lat, info.countryCode, info.adminName1, info.placeName
    ]
    await clientDev.query(insertPostalCodeInfoQuery, values)
}


export const getPostalCodeInfo = async (postalCode) => {
    return (await clientDev.query(getPostalCodeInfoQuery, [postalCode])).rows
}

export const insertPostalCodeInfo = async (postalCode, infoList) => {
    // will be transaction safe
    await insertCode(postalCode)

    for (const info of infoList)
        await insertCodeInfo(info)
}

export const open = async () => {
    await connect()
}


export const close = async () => {
    await clientDev.end()
}
