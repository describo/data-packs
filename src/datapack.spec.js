const { DataPack } = require("./datapack.js");

describe.only(`Test looking up data using the lookup class`, () => {
    it(`Should be able to load the country datapack and get something`, async () => {
        let datapack = new DataPack({
            dataPacks: "Country",
            indexFields: ["@id", "name", "isoA2", "isoA3"],
        });
        await datapack.load();
        let country = datapack.get({
            field: "@id",
            value: "https://www.ethnologue.com/country/AD",
        });
        expect(country.name).toBe("Andorra");
        expect(country.isoA2).toBe("AD");

        country = datapack.get({ field: "name", value: "Andorra" });
        expect(country.name).toBe("Andorra");
        expect(country.isoA2).toBe("AD");

        country = datapack.get({ field: "isoA2", value: "AD" });
        expect(country.name).toBe("Andorra");
        expect(country.isoA2).toBe("AD");
    });
    it(`Should be able to load the austlang datapack and get something`, async () => {
        let datapack = new DataPack({ dataPacks: "Austlang" });
        await datapack.load();
        let language = datapack.get({
            field: "@id",
            value: "https://collection.aiatsis.gov.au/austlang/language/A1",
        });
        expect(language.name).toBe("Nyaki Nyaki / Njaki Njaki");
        expect(language.alternateName).toContain("Nyungar");

        language = datapack.get({
            field: "name",
            value: "Nyaki Nyaki / Njaki Njaki",
        });
        expect(language.name).toBe("Nyaki Nyaki / Njaki Njaki");
        expect(language.alternateName).toContain("Nyungar");
    });
    it(`Should be able to load the austlang and glottolog datapacks and get something from each`, async () => {
        let datapack = new DataPack({ dataPacks: ["Austlang", "Glottolog"] });
        await datapack.load();
        let language = datapack.get({
            field: "@id",
            value: "https://collection.aiatsis.gov.au/austlang/language/A1",
        });
        expect(language.name).toBe("Nyaki Nyaki / Njaki Njaki");
        expect(language.alternateName).toContain("Nyungar");

        language = datapack.get({
            field: "@id",
            value: "https://glottolog.org/resource/languoid/id/more1255",
        });
        expect(language.name).toBe("Yam");
        expect(language.languageCode).toBe("more1255");
    });
    it(`Should be able to load various datapacks`, async () => {
        let datapack = new DataPack({ dataPacks: "Languages" });
        expect(datapack.dataPacks).toEqual(["Austlang", "Glottolog"]);

        datapack = new DataPack({ dataPacks: "Glottolog" });
        expect(datapack.dataPacks).toEqual(["Glottolog"]);

        datapack = new DataPack({ dataPacks: "Country" });
        expect(datapack.dataPacks).toEqual(["Country"]);

        datapack = new DataPack({ dataPacks: ["Country", "Languages"] });
        expect(datapack.dataPacks).toEqual(["Country", "Austlang", "Glottolog"]);
    });
    it(`Should be able to load glottolog and austlang and get something from each`, async () => {
        let datapack = new DataPack({ dataPacks: ["Glottolog", "Austlang"] });
        await datapack.load();

        let language = datapack.get({
            field: "@id",
            value: "https://collection.aiatsis.gov.au/austlang/language/A1",
        });
        expect(language.name).toBe("Nyaki Nyaki / Njaki Njaki");
        expect(language.alternateName).toContain("Nyungar");

        language = datapack.get({
            field: "@id",
            value: "https://glottolog.org/resource/languoid/id/more1255",
        });
        expect(language.name).toBe("Yam");
        expect(language.languageCode).toBe("more1255");
    });
    it(`Should be able to load glottolog and get something using ethnologue and austlang codes`, async () => {
        let datapack = new DataPack({
            dataPacks: ["Glottolog"],
            indexFields: ["@id", "name", "iso639-3", "austlangCode"],
        });
        await datapack.load();

        let language = datapack.get({
            field: "iso639-3",
            value: "rxd",
        });
        expect(language.name).toBe("Ngardi");
        expect(language.languageCode).toBe("ngar1288");

        language = datapack.get({
            field: "austlangCode",
            value: "A121",
        });
        expect(language.name).toBe("Ngardi");
        expect(language.languageCode).toBe("ngar1288");
    });
    it(`Should be able to load austlang and get something using an ethnologue and glottolog codes`, async () => {
        let datapack = new DataPack({
            dataPacks: ["Austlang"],
            indexFields: ["@id", "name", "iso639-3", "glottologCode"],
        });
        await datapack.load();

        // let language = datapack.get({
        //     field: "iso639-3",
        //     value: "rxd",
        // });
        // expect(language.name).toBe("Ngardi");
        // expect(language.languageCode).toBe("A121");

        language = datapack.get({
            field: "glottologCode",
            value: "ngar1288",
        });
        expect(language.name).toBe("Ngardi");
        expect(language.languageCode).toBe("A121");
    });
    it(`Should be able to load data and pluck only specified properties`, async () => {
        let datapack = new DataPack({ dataPacks: "Austlang" });
        await datapack.load();

        let language = datapack.get({
            field: "@id",
            value: "https://collection.aiatsis.gov.au/austlang/language/A1",
            properties: ["name", "source"],
        });
        expect(Object.keys(language).sort()).toEqual(["@id", "@type", "name", "source"]);

        datapack = new DataPack({ dataPacks: "Country" });
        await datapack.load();

        let country = datapack.get({
            field: "@id",
            value: "https://www.ethnologue.com/country/AD",
            properties: ["@id", "@type", "name"],
        });
        expect(Object.keys(country).sort()).toEqual(["@id", "@type", "name"]);

        // search again - make sure we haven't removed the country!
        country = datapack.get({
            field: "@id",
            value: "https://www.ethnologue.com/country/AD",
            properties: ["@id", "@type"],
        });
        expect(country).toEqual({
            "@id": "https://www.ethnologue.com/country/AD",
            "@type": "Country",
        });

        // test plucking from multiple hits
        datapack = new DataPack({ dataPacks: "Austlang", indexFields: ["source"] });
        await datapack.load();

        languages = datapack.get({
            field: "source",
            value: "Austlang",
            properties: ["@id", "@type"],
        });
        expect(Object.keys(languages[0])).toEqual(["@id", "@type"]);
        expect(Object.keys(languages[10])).toEqual(["@id", "@type"]);
    });
});
