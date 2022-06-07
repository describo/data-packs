const fetch = require("cross-fetch");
const _ = require("lodash")

var datapacks = {
	"Austlang": "https://raw.githubusercontent.com/Arkisto-Platform/describo-data-packs/master/Austlang-language-data/austlang-language-data-pack.json",
    "Glottolog": "https://raw.githubusercontent.com/Arkisto-Platform/describo-data-packs/master/Glottolog-language-data/glottolog-language-data-pack.json",
	"Country": "https://raw.githubusercontent.com/Arkisto-Platform/describo-data-packs/master/country-main-data-pack.json",
	"Languages": ["Austlang", "Glottolog"]
	
	
}

module.exports.datapacks = datapacks