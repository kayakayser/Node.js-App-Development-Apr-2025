import {close, getPostalCodeInfo, insertPostalCodeInfo, open} from "./postalcoderepository.mjs";
import {fetchPostalCodeInfo} from "./geonamesPostalCodeSearch.mjs";

export const getPostalCode = async (code) => {
    try {
        await open()
        let postalCodes = await getPostalCodeInfo(code)

        if (postalCodes !== undefined && postalCodes.length > 0)
            return {postalCodes: postalCodes}
    } finally {
        await close()
    }

    try {
        await open()
        let postalCodes = await fetchPostalCodeInfo(code)

        if (postalCodes.postalcodes !== undefined) {
            await insertPostalCodeInfo(code, postalCodes.postalcodes)

            return {postalCodes: (await getPostalCodeInfo(code))}
        }

        return {error: "Problem occurred while getting data"}
    } finally {
        await close()
    }
}