import {MongoClient} from "mongodb"

const URL = "mongodb://localhost:27017"

const connect = async () => await MongoClient.connect(URL)

export const findByQ = async (q) => {
    let client = null

    try {
        client = await connect()
        const db = client.db("wikiGeonamesDB")
        const wikiCollection = await db.collection("wiki")
        const findByQQuery = {q: q.toLowerCase()}
        const result = await wikiCollection.find(findByQQuery)
        const dataArray = await result.toArray()

        if (dataArray.length !== 0) {
            const queryCount = dataArray[0].queryCount + 1
            await wikiCollection.updateOne(findByQQuery, {$set: {lastQueryDateTime: new Date(), queryCount: queryCount}})
        }

        return dataArray
    }finally {
        if (client) {
            client.close()
        }
    }
}

export const save = async (q, json) => {
    let client = null

    try {
        client = await connect()
        console.log("Connected successfully")
        const db = client.db("wikiGeonamesDB")
        const wikiCollection = await db.collection("wiki")
        json.q = q.toLowerCase()
        json.lastQueryDateTime = new Date()
        json.queryCount = 1
        const id = await wikiCollection.insertOne(json)

        console.log(`Data saved with _id:${id.insertedId}`)
    }
    finally {
        if (client) {
            client.close()
        }
    }
}
