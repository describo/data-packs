/**
 * @property {object}  packs - the available data packs
 * @property {String}  packs.Austlang - The Austlang language data pack
 * @property {String}  packs.Glottolog - The Glottolog language data pack
 * @property {String}  packs.Ethnologue - The Ethnologue language data pack
 * @property {String}  packs.Country - The Countries data pack
 * @property {String}  packs.Languages - All languages data pack
 */
const datapacks = {
    Austlang: "languages/austlang-language-data-pack.json",
    Glottolog: "languages/glottolog-language-data-pack.json",
    Country: "countries/ISO-639-6-country-data/iso-639-6-country-data-pack.json",
    Languages: ["Austlang", "Glottolog"],
};

module.exports = {
    host: "https://raw.githubusercontent.com/Arkisto-Platform/describo-data-packs/master",
    datapacks,
};
