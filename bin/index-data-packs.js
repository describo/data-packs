const { IndexDataPacks } = require("../src/index-datapacks.js");

main();
async function main() {
    const index = new IndexDataPacks({ elasticUrl: "http://localhost:9200", log: true });
    await index.load();
}
