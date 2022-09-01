const { IndexDataPacks } = require("./index-datapacks.js");

describe.only(`Test indexing the data packs`, () => {
    it(`should be able to index all of the data packs`, async () => {
        const index = new IndexDataPacks({ elasticUrl: "http://localhost:9200" });
        await index.load();
    }, 10000);
});
