const parseRemoteAddress = address => address.substring("::ffff:".length)

const isUndefined = a => a === undefined
const isDefined = a => !isUndefined(a)

const createJson = (text, req) => {
    return {
        message: text,
        status: req.query.married === "" ? "Married" : "Single",
        dateTime: new Date().toISOString(),
        remoteAddress: parseRemoteAddress(req.connection.remoteAddress),
        remotePort: req.connection.remotePort,
        localPort: req.connection.localPort
    }
}

const greetingsHelloGetCallback = (req, res) => {
    console.log(`Client connected via -> ${parseRemoteAddress(req.connection.remoteAddress)}:${req.connection.remotePort}`)


    res.json(createJson(`Hello ${req.params.name}`, req))

}

const greetingsHiGetCallback = (req, res) => {
    console.log(`Client connected via -> ${parseRemoteAddress(req.connection.remoteAddress)}:${req.connection.remotePort}`)

    let text = "Parameters required -> "
    let status = 200

    if (isUndefined(req.query.first_name) || req.query.first_name === "") {
        text += "first_name required"
        status = 400
    }

    if (isUndefined(req.query.last_name)) {
        text += " last_name required"
        status = 400
    }

    if (status === 200) {
        const middleNameStr = isDefined(req.query.middle_name) ? ` ${req.query.middle_name}` : ""

        text = `Hi ${req.query.first_name}${middleNameStr} ${req.query.last_name}`
    }
    res.status(status)
    res.json(createJson(text, req))
}

export const doEndPoints = app => {
    app.get("/api/greetings/hello/:name", (req, res) => greetingsHelloGetCallback(req, res))
    app.get("/api/greetings/hi", (req, res) => greetingsHiGetCallback(req, res))
}

export const startService = (app, port) => {
    app.listen(port, () => console.log(`Listening on port ${port}`));
}
