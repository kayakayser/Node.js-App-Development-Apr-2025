export const fetchPostalCodeInfo = async (code) => {

    const url = `http://api.geonames.org/postalCodeLookupJSON?postalcode=${code}&country=TR&username=csystem`

    try {
        const response = await fetch(url)

        return await response.json()
    }
    catch (e) {
        console.log(e.message)
        throw e
    }
}