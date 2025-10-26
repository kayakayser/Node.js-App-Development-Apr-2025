import {fetchPostalCodeInfo} from "./geonamesPostalCodeSearch.mjs";

const geoPostalCodeCallback = async (req, res) => {
    try {
        const jsonData = await fetchPostalCodeInfo(req.query.code)

        if (jsonData.postalcodes !== undefined)
            res.json(jsonData)
        else
            res.status(400).json(jsonData)
    }
    catch (e) {
        res.status(500).json({error: e.message})
    }
}

export const createEndPoints = app => {
    app.get("/api/geo/postalcode", async (req, res) => await geoPostalCodeCallback(req, res))

}

export const startService = (app, port) => {
    app.listen(port, () => console.log(`Listening on port ${port}`));
}
