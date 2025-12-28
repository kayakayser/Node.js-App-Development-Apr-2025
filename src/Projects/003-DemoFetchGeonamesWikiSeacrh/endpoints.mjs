import {fetchData} from "./dataservice.mjs";

const geoWikiCallback = async (req, res) => {
    try {
        //...
        const maxRows = parseInt(req.query.maxRows)

        console.log(`Received request for q=${req.query.q} maxRows=${req.query.maxRows}`)

        if (isNaN(maxRows))
            throw new Error("maxRows must be a number")

        const jsonData = await fetchData(req.query.q, parseInt(req.query.maxRows))

        console.log(jsonData)
        if (jsonData.geonames !== undefined) {
            res.json(jsonData)
        }
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
