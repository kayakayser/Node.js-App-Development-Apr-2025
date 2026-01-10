import mongoose from "mongoose"

const URL = "mongodb://localhost:27017/wikiGeonamesDB"
mongoose.connect(URL)
const schemaJson = {
    geonames: Array,
    q: String,
    lastQueryDateTime: Date,
    queryCount: Number
}
const schema = new mongoose.Schema(schemaJson, {collection: "wiki"})
const wiki = mongoose.model("wiki", schema)

export const findByQMongoose = async (q) => {
    const findByQQuery = {q: q.toLowerCase()}
    const result = await wiki.find(findByQQuery).lean()

    if (result[0] !== undefined) {
        const queryCount = result[0].queryCount + 1
        await wiki.updateOne(findByQQuery, {$set: {lastQueryDateTime: new Date(), queryCount: queryCount}})
    }

    return result
}

export const saveMongoose = async (q, json) => {
    json.q = q.toLowerCase()
    json.lastQueryDateTime = new Date()
    json.queryCount = 1
    await wiki.create(json)
}
