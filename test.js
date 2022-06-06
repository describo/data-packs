
const lookup_datapack = require("./lookup_datapack")

let tree  = lookup_datapack({ packName: "Languages", find: "Matukar", filter: {"source": "Glottolog", "@type": "Language"}})
console.log(tree)
