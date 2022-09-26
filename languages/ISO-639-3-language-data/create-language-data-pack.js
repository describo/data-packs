const data = "https://www.ethnologue.com/sites/default/files/LanguageCodes.tab";
const languagePack = "./iso-639-3-language-data-pack.json";
const fetch = require("cross-fetch");
const { writeJson } = require("fs-extra");

main();
async function main() {
    let response = await fetch(data, { cache: "reload" });
    if (response.status !== 200) {
        throw new Error(response);
    }
    response = await response.text();

    const languageData = [];
    for (let line of response.split("\n")) {
        if (line.match("LangID")) continue;

        let components = line.trim().split("\t");
        let [code, country, status, name] = components;
        if (name && code) {
            languageData.push({
                "@type": "Language",
                "@id": `https://www.ethnologue.com/language/${code}`,
                name,
                languageCode: code,
            });
        }
    }

    await writeJson(languagePack, languageData);
}
