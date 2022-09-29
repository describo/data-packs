const { datapacks, host } = require("./index.js");
const { fetch } = require("cross-fetch");
const path = require("path");
const { isString, chunk, flattenDeep } = require("lodash");
const { Client } = require("@elastic/elasticsearch");

/** Class to load data packs into ElasticSearch. */
class IndexDataPacks {
    /**
     * Load data packs
     * @constructor
     * @param {Object} params
     * @param {string} params.elasticUrl- the URL to the elasic search server
     * @param {string} [params.chunkSize=500] - the number of documents to bulk load per chunk
     * @param {Boolean} [params.log] - log which data pack is being loaded
     */
    constructor({ elasticUrl, chunkSize = 500, log = false }) {
        this.chunkSize = chunkSize;
        this.elasticUrl = elasticUrl;
        this.log = log;
    }

    /**
     * Load the data packs and index them
     * @async
     */
    async load() {
        const client = new Client({
            node: this.elasticUrl,
        });
        for (let pack of Object.keys(datapacks)) {
            if (this.log) {
                console.log(`Loading ${pack}`);
            }
            if (isString(datapacks[pack]) && datapacks[pack].match(/.*\.json$/)) {
                pack = path.join(host, datapacks[pack]);
                let data = await this.fetchDataPack({ pack });
                let chunks = chunk(data, this.chunkSize);
                for (let chunk of chunks) {
                    chunk = chunk.map((c) => {
                        return [{ index: { _id: c["@id"], _index: "data" } }, c];
                    });
                    chunk = flattenDeep(chunk);

                    try {
                        await client.bulk({ body: chunk });
                    } catch (error) {
                        console.log(error.message);
                    }
                }
            }
        }
    }

    /**
     * @private
     */
    async fetchDataPack({ pack }) {
        let response = await fetch(pack);
        if (response.status === 200) {
            let data = await response.json();
            return data;
        } else {
            console.error(`Unable to fetch data pack: '${pack}'`);
            return [];
        }
    }
}

module.exports = {
    IndexDataPacks,
};

// main();
// async function main() {
//     const index = new IndexDataPacks({ elasticUrl: "http://localhost:9200", log: true });
//     await index.load();
// }
