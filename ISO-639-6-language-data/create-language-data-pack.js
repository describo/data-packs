const data = "https://www.ethnologue.com/sites/default/files/LanguageCodes.tab";
const languagePack = "./iso-639-6-language-data-pack.json";
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
        if (line.match("LangID")) continue;

        let components, code, country, status, name;
        try {
            components = line.split("\t");
            code = components.shift();
            country = components.shift();
            status = components.shift();
            name = components[0].replace("\r", "");
            if (name && code) {
                languageData.push({
                    "@type": "Language",
                    "@id": `@language-${code}-${name}`,
                    name,
                    alternateName: code,
                });
            }
        } catch (error) {
            console.log(error.message, components);
        }
    }

    await writeJson(languagePack, languageData);
})();
