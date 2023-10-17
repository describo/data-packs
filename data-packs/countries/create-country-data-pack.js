// const countryCodesTab = "https://www.ethnologue.com/sites/default/files/CountryCodes.tab";
const countryCodesJson = "https://datahub.io/core/country-codes/r/country-codes.json";
const countryGeoJSON = "https://datahub.io/core/geo-countries/r/countries.geojson";
const languagePack = "./iso-639-6-country-data-pack.json";
const fetch = require("cross-fetch");
const { writeJson } = require("fs-extra");
const { groupBy } = require("lodash");

main();
async function main() {
    const countries = JSON.parse(await get({ url: countryCodesJson }));

    let countryData = [];
    for (let country of countries) {
        countryData.push({
            "@id": `https://www.ethnologue.com/country/${country["ISO3166-1-Alpha-2"]}`,
            "@type": "Country",
            name: country.official_name_en,
            isoA2: country["ISO3166-1-Alpha-2"],
            isoA3: country["ISO3166-1-Alpha-3"],
        });
    }
    let countryGeoJSONData = await get({ url: countryGeoJSON, as: "json" });
    countryGeoJSONGroupedByName = groupBy(countryGeoJSONData.features, (c) => c.properties.ISO_A3);

    countryData = countryData.map((country) => {
        try {
            country = {
                ...country,
                geo: {
                    "@id": `#${encodeURIComponent(country.name)}`,
                    "@type": "GeoShape",
                    name: `Geographical coverage for ${country.name}`,
                    geojson: JSON.stringify(countryGeoJSONGroupedByName[country.isoA3][0]),
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
