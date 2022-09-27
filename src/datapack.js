const { datapacks, host } = require("./index.js");
const path = require("path");
const { fetch } = require("cross-fetch");
const { isString, groupBy, flattenDeep, cloneDeep } = require("lodash");

/** Class to interact with data packs . */
class DataPack {
    /**
     * Interact with data packs
     * @constructor
     * @param {Object} params
     * @param {string|String[]} params.dataPacks - the data packs you wish to load
     * @param {string[]} [params.indexFields=@id, name, alternateName, languageCode] - the fields you wish to index over
     */
    constructor({
        dataPacks = [],
        indexFields = ["@id", "name", "alternateName", "languageCode"],
    }) {
        if (isString(dataPacks)) dataPacks = [dataPacks];

        dataPacks = dataPacks.map((pack) => {
            if (isString(datapacks[pack]) && datapacks[pack].match(/.*\.json$/)) {
                return pack;
            } else {
                return datapacks[pack].map((p) => p);
            }
        });
        this.dataPacks = flattenDeep(dataPacks);
        this.packData = [];
        this.indexFields = indexFields;
        this.indexes = {};
    }

    /**
     * Load the data packs and index them
     * @async
     */
    async load() {
        let packs = [];
        for (let pack of this.dataPacks) {
            pack = await this.fetchDataPack({ pack: path.join(host, datapacks[pack]) });
            packs = [...packs, ...pack];
        }
        this.packData = packs;

        for (let field of this.indexFields) {
            this.indexes[field] = groupBy(packs, field);
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

    /**
     * Get something from the datapacks
     * @param {Object} params
     * @param {string} params.field - the field to search on, e.g.: '@id'
     * @param {string} params.valye - the string to search for
     */
    get({ field, value }) {
        const result = this.indexes[field][value];
        if (!result || result.length === 0) {
            return undefined;
        } else if (result.length === 1) {
            return cloneDeep(result[0]);
        } else {
            return cloneDeep(result);
        }
    }
}

module.exports = { DataPack };
