export const fetchWikiSearchInfo = async (q, mr) => {

    const url = `http://api.geonames.org/wikipediaSearchJSON?&q=${q}&maxRows=${mr}&username=csystem`

    try {
        const response = await fetch(url)

        return await response.json()
    }
    catch (e) {
        console.log(e.message)
        throw e
    }
}