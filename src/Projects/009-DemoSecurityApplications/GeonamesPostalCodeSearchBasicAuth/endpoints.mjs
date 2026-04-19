import {getPostalCode, isAuthenticated} from "./postalcodeservice.mjs";
import basicAuth from "basic-auth";

const geoPostalCodeCallback = async (req, res) => {
    try {
        console.log(req.query)
        const jsonData = await getPostalCode(req.query.code)

        if (jsonData.postalCodes !== undefined)
            res.json(jsonData)
        else
            res.status(400).json(jsonData)
    }
    catch (e) {
        res.status(500).json({error: e.message})
    }
}

const authenticate = async (req, res, next) => {
    const user = basicAuth(req)

    if (user) {
        if (await isAuthenticated(user.name, user.pass)) {
            console.log(`user ${user.name}, password: ${user.pass}`)
            next()
        } else {
            res.set("WWW-Authenticate", "Unauthorized");

            return res.status(401).json({error: "Unauthorized"})
        }
    } else {
        res.set("WWW-Authenticate", "Basic Auth required");

        return res.status(403).json({error: "Forbidden"})
    }
}

export const createEndPoints = app => {
    app.use(authenticate)
    app.post("/api/users", async (req, res) => {}) //Add user authenticate as admin
    app.get("/api/geo/postalcode", async (req, res) => await geoPostalCodeCallback(req, res))
    app.get("/api/geo/postalcode/count", async (req, res) => {})

}

export const startService = (app, port) => {
    app.listen(port, () => console.log(`Listening on port ${port}`));
}
