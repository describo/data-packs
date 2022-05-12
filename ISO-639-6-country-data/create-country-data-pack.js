const data = "https://www.ethnologue.com/sites/default/files/CountryCodes.tab";
const languagePack = "./iso-639-6-country-data-pack.json";
const fetch = require("cross-fetch");
const { writeJson } = require("fs-extra");

(async () => {
    let response = await fetch(data, { cache: "reload" });
    if (response.status !== 200) {
        throw new Error(response);
    }
    response = await response.text();

    const countryData = [];
    for (let line of response.split("\n")) {
        if (line.match("CountryID")) continue;

        let components, code, country, name;
        try {
            components = line.split("\t");
            code = components.shift();
            name = components.shift();
            region = components[0].replace("\r", "");
            if (name && code) {
                // console.log(code, country, name);
                countryData.push({
                    "@id": `https://www.ethnologue.com/country/${code}`,
					"@type": "Country",
                    name,
                    alternateName: code,
                });
            }
        } catch (error) {
            console.log(error.message, components);
        }
    }

    await writeJson(languagePack, countryData);
})();
