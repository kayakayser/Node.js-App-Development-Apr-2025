import {fetchWikiSearchInfo} from "./geonamesWikisearch.mjs";
import {findByQ, save} from "./repository.mjs";

export const fetchData = async (q, maxRows) => {
    const data = await findByQ(q)

    console.log(data)

    if (data.length !== 0)
        return data[0].geonames

    const jsonData = await fetchWikiSearchInfo(q, maxRows)

    console.log(jsonData)

    await save(q, jsonData)

    return jsonData.geonames
}