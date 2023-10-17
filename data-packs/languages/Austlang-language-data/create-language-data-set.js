const data =
    "https://data.gov.au/data/dataset/70132e6f-259c-4e0f-9f95-4aed1101c053/resource/e9a9ea06-d821-4b53-a05f-877409a1a19c/download/aiatsis_austlang_endpoint_001.csv";

const languagePack = "./austlang-language-data-pack.json";
const fetch = require("cross-fetch");
const { writeJson } = require("fs-extra");

main();
async function main() {
    let response = await fetch(data, { cache: "reload" });
    if (response.status !== 200) {
        throw new Error(response);
    }
    response = await response.text();
    const lines = response.split("\n").map((l) => l.trim());
    let columns = lines[0].split(",").map((c) => c.replace(/"/g, "").trim());

    const languageData = [];
    for (let item of lines.slice(1, lines.length)) {
        item = item.split('",').map((c) => c.replace(/"/g, ""));

        let data = {};
        columns.forEach((column, index) => {
            data[column] = item[index]?.trim();
        });
        try {
            const geoj = {
                type: "Feature",
                properties: {
                    name: data.language_name,
                },
                geometry: {
                    type: "Point",
                    coordinates: [
                        data.approximate_longitude_of_language_variety,
                        data.approximate_latitude_of_language_variety,
                    ],
                },
            };

            const geoLocation = {
                "@id": `#${encodeURIComponent(data.language_name)}`,
                "@type": "GeoCoordinates",
                name: `Geographical coverage for ${data.language_name}`,
                geojson: JSON.stringify(geoj),
            };

            if (data.language_name && data.language_code) {
                languageData.push({
                    // "@id": data.uri,
                    "@id": `https://collection.aiatsis.gov.au/austlang/language/${data.language_code}`,
                    "@type": "Language",
                    languageCode: data.language_code,
                    name: data.language_name,
                    geo: geoLocation,
                    source: "Austlang",
                    sameAs: [],
                    alternateName: data.language_synonym.split(",").map((name) => name.trim()),
                });
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    await writeJson(languagePack, languageData);
}
