const fetch = require("cross-fetch");
const _ = require("lodash")

let datapacks = {
	"Austlang": "https://raw.githubusercontent.com/Arkisto-Platform/describo-data-packs/master/languages/Austlang-language-data/austlang-language-data-pack.json",
    "Glottolog": "https://raw.githubusercontent.com/Arkisto-Platform/describo-data-packs/master/languages/Glottolog-language-data/glottolog-language-data-pack.json",
	"Country": "https://raw.githubusercontent.com/Arkisto-Platform/describo-data-packs/master/countries/country-main-data-pack.json",
	"Languages": ["Austlang", "Glottolog"]
	
	
}

module.exports = { datapacks }