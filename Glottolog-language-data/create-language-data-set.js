const data = "https://raw.githubusercontent.com/glottolog/glottolog-cldf/master/cldf/languages.csv"
const languagePack = "./glottolog-language-data-pack.json";
const fetch = require("cross-fetch");
const { writeJson } = require("fs-extra");

(async () => {
    let response = await fetch(data, { cache: "reload" });
    if (response.status !== 200) {
        throw new Error(response);
    }
    response = await response.text();

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
					geojson: {"latitude": latitude, "longitude": longitude},
					source: "Glottolog",
					containtInPlace: country,
					sameAs: sameAsList,
                    alternateName: iso639Code,
                });
            }
        } catch (error) {
            console.log(error.message, components);
        }
    }

    await writeJson(languagePack, languageData);
})();