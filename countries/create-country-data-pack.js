const countryCodesTab = "https://www.ethnologue.com/sites/default/files/CountryCodes.tab";
const countryGeoJSON = "https://datahub.io/core/geo-countries/r/countries.geojson";
const languagePack = "./iso-639-6-country-data-pack.json";
const countryISOMapping = require("./mapping-iso3-iso2.json"); // from https://github.com/vtex/country-iso-3-to-2
const fetch = require("cross-fetch");
const { writeJson } = require("fs-extra");
const { groupBy } = require("lodash");
const iso2to3Mapping = flipIsoMapping();

main();
async function main() {
    let countryCodes = await get({ url: countryCodesTab });
    const lines = countryCodes.split("\n").map((l) => l.trim());

    let countryData = [];
    for (let line of lines.slice(1, lines.length)) {
        let components, code, country, name;
        try {
            let [code, name, region] = line.split("\t");
            if (name && code) {
                // console.log(code, country, name);
                countryData.push({
                    "@id": `https://www.ethnologue.com/country/${code}`,
                    "@type": "Country",
                    name,
                    iso2: code,
                    iso3: iso2to3Mapping[code],
                });
            }
        } catch (error) {
            console.log(error.message, components);
        }
    }

    let countryGeoJSONData = await get({ url: countryGeoJSON, as: "json" });
    countryGeoJSONGroupedByName = groupBy(countryGeoJSONData.features, (c) => c.properties.ISO_A3);

    countryData = countryData.map((country) => {
        try {
            country = {
                ...country,
                geojson: {
                    "@id": "#" + country.name,
                    "@type": "GeoShape",
                    geojson: JSON.stringify(countryGeoJSONGroupedByName[country.iso3][0]),
                },
            };
        } catch (error) {
            console.warn(`No coordinate data found for: ${country.name}`);
        }
        return country;
    });

    await writeJson(languagePack, countryData);
}

async function get({ url, as = "text" }) {
    let response = await fetch(url, { cache: "reload" });
    if (response.status !== 200) {
        throw new Error(response);
    }
    if (as === "text") {
        return await response.text();
    } else if (as === "json") {
        return await response.json();
    }
}

function flipIsoMapping() {
    let mapping = {};
    Object.keys(countryISOMapping).forEach((key) => (mapping[countryISOMapping[key]] = key));
    return mapping;
}
