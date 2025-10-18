import {fetchWikiSearchInfo} from "./geonamesWikisearch.mjs";

const geoWikiCallback = async (req, res) => {
    try {
        //...
        const maxRows = parseInt(req.query.maxRows)

        if (isNaN(maxRows))
            throw new Error("maxRows must be a number")

        const jsonData = await fetchWikiSearchInfo(req.query.q, parseInt(req.query.maxRows))

        if (jsonData.geonames !== undefined)
            res.json(jsonData)
        else
            res.status(400).json(jsonData)
    }
    catch (e) {
        res.status(500).json({error: e.message})
    }
}

export const createEndPoints = app => {
    app.get("/api/geo/wiki", async (req, res) => await geoWikiCallback(req, res))

}

export const startService = (app, port) => {
    app.listen(port, () => console.log(`Listening on port ${port}`));
}
