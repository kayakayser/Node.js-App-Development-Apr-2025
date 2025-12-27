import {MongoClient} from "mongodb"

const URL = "mongodb://localhost:27017"

const connect = async () => await MongoClient.connect(URL)


const logAll = async (q, wikiCollection) => {
    const query = {q: q.toLowerCase()}

    const result = await wikiCollection.find(query)

    console.log(await result.toArray())
}

export const save = async (q, json) => {
    let client = null

    try {
        client = await connect()
        console.log("Connected successfully")
        const db = client.db("wikiGeonamesDB")
        const wikiCollection = await db.collection("wiki")
        json.q = q.toLowerCase()
        const id = await wikiCollection.insertOne(json)

        console.log(`Data saved with _id:${id.insertedId}`)
        await logAll(q, wikiCollection)
    }
    finally {
        if (client) {
            client.close()
        }
    }

}
