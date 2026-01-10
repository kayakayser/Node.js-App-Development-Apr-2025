import {fetchWikiSearchInfo} from "./geonamesWikisearch.mjs";
import {findByQ, save} from "./repository.mjs";
import {findByQMongoose, saveMongoose} from "./repository-mongoose.mjs";

const fetchDataByMongoDb = async (q, maxRows) => {
    const data = await findByQ(q)

    console.log(data)

    if (data.length !== 0)
        return {"geonames": data[0].geonames}

    const jsonData = await fetchWikiSearchInfo(q, maxRows)

    console.log(jsonData)

    await save(q, jsonData)

    return {"geonames": jsonData.geonames}
}

const fetchDataByMongoose = async (q, maxRows) => {
    const data = await findByQMongoose(q)

    if (data[0] !== undefined)
        return {"geonames": data[0].geonames}

    const jsonData = await fetchWikiSearchInfo(q, maxRows)

    console.log(jsonData)

    await saveMongoose(q, jsonData)

    return {"geonames": jsonData.geonames}
}

export const fetchData = async (q, maxRows) => {
    return await fetchDataByMongoose(q, maxRows)
}