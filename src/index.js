/**
 * @global
 *
 * @description The data packs that are available in this repository.
 *
 * @property {object}  packs - the available data packs
 * @property {String}  packs.Austlang - The Austlang language data pack
 * @property {String}  packs.Glottolog - The Glottolog language data pack
 * @property {String}  packs.Country - The Countries data pack
 * @property {String}  packs.Languages - All languages data pack = ["Austlang", "Glottolog" ]
 */
const datapacks = {
    Austlang: {
        path: "languages/austlang-language-data-pack.json",
        description:
            "Information about Aboriginal and Torres Strait Islander languages which has been assembled from a number of referenced sources",
        source: "https://collection.aiatsis.gov.au/austlang/about",
    },
    Glottolog: {
        path: "languages/glottolog-language-data-pack.json",
        description:
            "Information about the different languages, dialects, and families of the world ",
        source: "https://glottolog.org",
    },
    Country: {
        path: "countries/iso-639-6-country-data-pack.json",
        description: "ISO-639-6 country data",
        source: "https://datahub.io/core/country-codes/r/country-codes.json",
    },
    Languages: ["Austlang", "Glottolog"],
};

module.exports = {
    host: "https://raw.githubusercontent.com/describo/data-packs/master/data-packs",
    datapacks,
};
