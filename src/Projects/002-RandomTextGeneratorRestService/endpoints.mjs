const parseRemoteAddress = address => address.substring("::ffff:".length)

const isUndefined = a => a === undefined // will be used from remote library later
const isDefined = a => !isUndefined(a) // will be used from remote library later
const isIntNumber = s => !s.includes(".") && !isNaN(Number(s)) // will be used from remote library later

// will be used from remote library later
const LETTERS_EN = "abcdefghijklmnopqrstuvwxyz"
const UPPERCASE_EN = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
const ALL_LETTERS_EN = LETTERS_EN + UPPERCASE_EN

const randomInt = (min, bound) => Math.floor(Math.random() * (bound - min) + min)
const randomText = (count, source) => {
    let result = ""

    for (let i = 0; i < count; ++i)
        result += source.charAt(randomInt(0, source.length))

    return result
}

const randomTextEN = count => randomText(count, ALL_LETTERS_EN)

const createTextOkJson = str => {
    return {
        text: str,
        dateTime: new Date().toISOString()
    }
}

const createLengthOkJson = length => {
    return {
        maxLength: length,
    }
}

const createBadRequestJson = text => {
    return {
        errorMessage: text,
        dateTime: new Date().toISOString()
    }
}

const generateTextCallback = (req, res, maxLength) => {
    console.log(`Client connected via -> ${parseRemoteAddress(req.connection.remoteAddress)}:${req.connection.remotePort}`)

    if (isUndefined(req.query.min) || isUndefined(req.query.bound)) {
        res.status(400)
        res.json(createBadRequestJson("min and bound parameters are not in query"))
        return
    }

    if (!isIntNumber(req.query.min) || !isIntNumber(req.query.bound)) {
        res.status(400)
        res.json(createBadRequestJson("min and bound parameters are not number"))
        return
    }

    const min = parseInt(req.query.min)
    const bound = parseInt(req.query.bound)

    if (bound - min > maxLength) {
        res.status(400)
        res.json(createBadRequestJson(`maximum character length reached -> Maximum charcter length is ${maxLength}`))
    }
    else if (min >= bound) {
        res.status(400)
        res.json(createBadRequestJson("min must be less than bound"))
    }
    else
        res.json(createTextOkJson(randomTextEN(randomInt(min, bound))))
}

const getMaxLengthCallback = (req, res, maxLength) => {
    console.log(`Client connected via -> ${parseRemoteAddress(req.connection.remoteAddress)}:${req.connection.remotePort}`)

    res.json({maxLength: maxLength})
}

export const doEndPoints = (app, maxLength) => {
    app.get("/api/generator/text", (req, res) => generateTextCallback(req, res, maxLength))
    app.get("/api/generator/text/maxlength", (req, res) => getMaxLengthCallback(req, res, maxLength))
}

export const startService = (app, port) => {
    app.listen(port, () => console.log(`Listening on port ${port}`));
}
