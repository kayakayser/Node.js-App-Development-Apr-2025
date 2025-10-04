const parseRemoteAddress = address => address.substring("::ffff:".length)

const createJson = (text, req) => {
    return {
        message: text,
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

    let text = "Parameters required"

    if (req.query.first_name === undefined || req.query.last_name === undefined)
        res.status(400)
    else
        text = `Hi ${req.query.first_name} ${req.query.last_name}`

    res.json(createJson(text, req))
}

export const doEndPoints = app => {
    app.get("/api/greetings/hello/:name", (req, res) => greetingsHelloGetCallback(req, res))
    app.get("/api/greetings/hi", (req, res) => greetingsHiGetCallback(req, res))
}

export const startService = (app, port) => {
    app.listen(port, () => console.log(`Listening on port ${port}`));
}
