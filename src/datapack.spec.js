const { DataPack } = require("./datapack.js");

describe(`Test looking up data using the lookup class`, () => {
    it(`Should be able to load the country datapack and get something`, async () => {
        let datapack = new DataPack({
            dataPacks: "Country",
            indexFields: ["@id", "name", "iso2", "iso3"],
        });
        await datapack.load();
        let country = datapack.get({
            field: "@id",
            value: "https://www.ethnologue.com/country/AD",
        });
        expect(country.name).toBe("Andorra");
        expect(country.iso2).toBe("AD");

        country = datapack.get({ field: "name", value: "Andorra" });
        expect(country.name).toBe("Andorra");
        expect(country.iso2).toBe("AD");

        country = datapack.get({ field: "iso2", value: "AD" });
        expect(country.name).toBe("Andorra");
        expect(country.iso2).toBe("AD");
    });
    it(`Should be able to load the austlang datapack and get something`, async () => {
        let datapack = new DataPack({ dataPacks: "Austlang" });
        await datapack.load();
        let language = datapack.get({
            field: "@id",
            value: "https://collection.aiatsis.gov.au/austlang/language/A1",
        });
        expect(language.name).toBe("Nyaki Nyaki / Njaki Njaki");
        expect(language.alternateName).toMatch("Nyungar");

        language = datapack.get({
            field: "name",
            value: "Nyaki Nyaki / Njaki Njaki",
        });
        expect(language.name).toBe("Nyaki Nyaki / Njaki Njaki");
        expect(language.alternateName).toMatch("Nyungar");
    });
    it(`Should be able to load the austlang and glottolog datapacks and get something from each`, async () => {
        let datapack = new DataPack({ dataPacks: ["Austlang", "Glottolog"] });
        await datapack.load();
        let language = datapack.get({
            field: "@id",
            value: "https://collection.aiatsis.gov.au/austlang/language/A1",
        });
        expect(language.name).toBe("Nyaki Nyaki / Njaki Njaki");
        expect(language.alternateName).toMatch("Nyungar");

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
        expect(language.alternateName).toMatch("Nyungar");

        language = datapack.get({
            field: "@id",
            value: "https://glottolog.org/resource/languoid/id/more1255",
        });
        expect(language.name).toBe("Yam");
        expect(language.languageCode).toBe("more1255");
    });
});
