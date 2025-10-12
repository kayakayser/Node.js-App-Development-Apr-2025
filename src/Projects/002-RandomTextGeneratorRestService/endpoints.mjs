
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

const parseRemoteAddress = address => address.substring("::ffff:".length) // will be used from remote library later
// will be used from remote library later
const sendJsonWithStatusCode = (res, code, json) => res.status(code).json(json)

const sendJsonBadRequest = (res, json) => sendJsonWithStatusCode(res, 400, json)

const createJson = (textFieldName, text) => {

    return {
        textFieldName: text,
        queryDate: new Date().toISOString()
    }
}
const createTextOkJson = str => {
    return {
        text: str,
        queryDate: new Date().toISOString()
    }
}

const createTextsOkJson = texts => {
    return {
        texts: texts,
        queryDate: new Date().toISOString()
    }
}

const createLimitsJson = (maxLength, maxTextCount) => {
    return {
        maxLength: maxLength,
        maxTextCount: maxTextCount
    }
}

const createBadRequestJson = text => {
    return {
        errorMessage: text,
        queryDate: new Date().toISOString()
    }
}

const validateParams =  (req, res) => {
    if (isUndefined(req.query.min) || isUndefined(req.query.bound)) {
        sendJsonBadRequest(res, createBadRequestJson("min and bound parameters are not in query"))
        return {valid: false}
    }

    if (!isIntNumber(req.query.min) || !isIntNumber(req.query.bound)) {
        sendJsonBadRequest(res, createBadRequestJson("min and bound parameters are not number"))
        return {valid: false}
    }

    return {valid: true, min: parseInt(req.query.min), bound: parseInt(req.query.bound)}
}

const doAction =  (res, min, bound, maxLength, action) => {
    if (bound - min > maxLength) {
        sendJsonBadRequest(res, createBadRequestJson(`maximum character length reached -> Maximum character length is ${maxLength}`))
    }
    else if (min >= bound) {
        sendJsonBadRequest(res, createBadRequestJson("min must be less than bound"))
    }
    else
        action(res)
}

const generateTexts = (res, min, bound, count) => {
    let texts = []

    for (let i = 0; i < count; ++i)
        texts[i] = randomTextEN(randomInt(min, bound))

    res.json(createTextsOkJson(texts))
}

const generateTextsCallback = (req, res, maxLength, maxTextCount) => {
    console.log(`Client connected via -> ${parseRemoteAddress(req.connection.remoteAddress)}:${req.connection.remotePort}`)

    let count;

    if (!isIntNumber(req.params.count) || (count = parseInt(req.params.count)) <= 0 || count > maxTextCount) {
        sendJsonBadRequest(res, createBadRequestJson(`count must be a positive number less than ${maxTextCount}`))
        return
    }

    const {valid, min, bound} = validateParams(req, res)

    if (valid)
        doAction(res, min, bound, maxLength, res => generateTexts(res, min, bound, count))
}

const generateTextCallback = (req, res, maxLength) => {
    console.log(`Client connected via -> ${parseRemoteAddress(req.connection.remoteAddress)}:${req.connection.remotePort}`)

    const {valid, min, bound} = validateParams(req, res)

    if (valid)
        doAction(res, min, bound, maxLength, res => res.json(createTextOkJson(randomTextEN(randomInt(min, bound)))))
}

const getLimitsCallback = (req, res, maxLength, maxTextCount) => {
    console.log(`Client connected via -> ${parseRemoteAddress(req.connection.remoteAddress)}:${req.connection.remotePort}`)

    res.json(createLimitsJson(maxLength, maxTextCount))
}

export const createEndPoints = (app, maxLength, maxTextCount) => {
    app.get("/api/generator/text/limits", (req, res) => getLimitsCallback(req, res, maxLength, maxTextCount))
    app.get("/api/generator/text", (req, res) => generateTextCallback(req, res, maxLength))
    app.get("/api/generator/texts/:count", (req, res) => generateTextsCallback(req, res, maxLength, maxTextCount))
}

export const startService = (app, port) => {
    app.listen(port, () => console.log(`Listening on port ${port}`));
}
