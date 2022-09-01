/**
 * @property {object}  packs - the available data packs
 * @property {String}  packs.Austlang - The Austlang language data pack
 * @property {String}  packs.Glottolog - The Glottolog language data pack
 * @property {String}  packs.Ethnologue - The Ethnologue language data pack
 * @property {String}  packs.Country - The Countries data pack
 * @property {String}  packs.Languages - All languages data pack
 */
const datapacks = {
    Austlang: "languages/Austlang-language-data/austlang-language-data-pack.json",
    Glottolog: "languages/Glottolog-language-data/glottolog-language-data-pack.json",
    Ethnologue: "languages/ISO-639-6-language-data/iso-639-6-language-data-pack.json",
    Country: "countries/countries-main-data-pack.json",
    Languages: ["Austlang", "Glottolog", "Ethnologue"],
};

module.exports = {
    host: "https://raw.githubusercontent.com/Arkisto-Platform/describo-data-packs/master",
    datapacks,
};
