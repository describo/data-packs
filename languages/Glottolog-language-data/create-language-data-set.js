const data = "https://raw.githubusercontent.com/glottolog/glottolog-cldf/master/cldf/languages.csv"
//var alternativeNames = "./languages/Glottolog-language-data/alternativeNames.csv"
var alternativeNames = "./alternativeNames.csv"
const languagePack = "./glottolog-language-data-pack.json";
const fetch = require("cross-fetch");
const { writeJson } = require("fs-extra");
const fs = require('fs');



function get_alternative_names() {
	var altDict = {}
	var alternativeList = fs.readFileSync(alternativeNames)
		.toString() // convert Buffer to string
		.split('\n') // split string to lines
		.map(e => e.trim()) // remove white spaces for each line
		.map(e => e.split('\t').map(e => e.trim())); // split each line to array

	for (let i = 0; i < alternativeList.length; i++) {
		
		altDict[alternativeList[i][0]] = alternativeList[i][1]
	}
	return altDict
}


(async () => {
    let response = await fetch(data, { cache: "reload" });
    if (response.status !== 200) {
        throw new Error(response);
    }
    response = await response.text();

    var alternativeNameDict  = get_alternative_names()
	
    console.log(alternativeNameDict);

    const languageData = [];
    for (let line of response.split("\n")) {
        if (line.match("ID")) continue;

        let components, code, name, macroarea, latitude, longitude, glottocode, iso639Code, country, sameAsList, sameAsDict;
        try {
            components = line.split(",");
            code = components.shift();
            name = components.shift();
            macroarea = components.shift();
			latitude = components.shift()
			longitude = components.shift()
			glottocode = components.shift()
			
			if ((name in alternativeNameDict) && (!alternativeNameDict == "undefined")) {
				alternateName = alternativeNameDict[name].replaceAll(",", ", ")
			} else {
				alternateName = "";
			}
			
			/*
			"geojson": {
             @id: "#{name},
             @type: "GeoCoordinates",
             geojson: "{\"type\":\"Feature\",\"geometry\":{\"type\":\"Point\",\"coordinates\":[\"-14.475977159965\",\"144.59443977457\"]}}",
	},
    */
			
			var geojson = {"type": "Feature",
			  "geometry": {
				"type": "Point",
				"coordinates": [latitude, longitude]
			  }}			
			
			var geoLocation = {
			  "@id": "#" + name,
			  "@type": "GeoCoordinates",
			  "geojson": JSON.stringify(geojson)};
			
			// add iso 639 codes as links to the ethnologue source
			iso639Code = components.shift()
			sameAsList = []
			if (iso639Code) {
				sameAsDict = {}
			    sameAsDict["@id"] =  "https://www.ethnologue.com/language/" + iso639Code;
				sameAsList.push(sameAsDict)
			}

			
			country = components.shift()   // glottolog uses the ISO 3166-1 alpha-2 codes
            //name = components[0]//.replace("\r", "");
            if (name && code) {
                languageData.push({
					"@id": `https://glottolog.org/resource/languoid/id/${code}`,
					"@type": "Language",
					languageCode: code,
					name,
					geojson: geoLocation,
					source: "Glottolog",
					containtInPlace: macroarea,
					sameAs: sameAsList,
                    alternateName,
                });
            }
        } catch (error) {
            console.log(error.message, components);
        }
    }

    await writeJson(languagePack, languageData, {"spaces":4});
})();