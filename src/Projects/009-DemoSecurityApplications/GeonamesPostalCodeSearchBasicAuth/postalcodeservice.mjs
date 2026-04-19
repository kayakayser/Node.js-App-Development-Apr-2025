import {exists, getPostalCodeInfo, insertPostalCodeInfo, isAuthenticated as isAuth} from "./postalcoderepository.mjs";
import {fetchPostalCodeInfo} from "./geonamesPostalCodeSearch.mjs";

export const getPostalCode = async (code) => {

    if (await exists(code)) {
        let postalCodes = await getPostalCodeInfo(code)

        return {postalCodes: postalCodes}
    }

    let postalCodes = await fetchPostalCodeInfo(code)

    if (postalCodes.postalcodes !== undefined) {
        await insertPostalCodeInfo(code, postalCodes.postalcodes)

        return {postalCodes: (await getPostalCodeInfo(code))}
    }

    return {error: "Problem occurred while getting data"}
}

export const isAuthenticated = async (username, password) => await isAuth(username, password)