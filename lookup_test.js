
const lookup = require("./lookup_datapack.js")
const lookup_chained = require("./lookup_chained.js")


//let promise = Promise.resolve(lookup({ packName: "Languages", find: "Matukar", filter: {"source": "Glottolog", "@type": "Language"}}))
//let promise = Promise.resolve(lookup({packName: "Languages", find: "atukar", filter: {"source": "Glottolog"}}))
//let promise = Promise.resolve(lookup({ packName: "Glottolog", find: "atukar", filter: {"source": "Glottolog", "@type": "Language"}}))
//let promise = Promise.resolve(lookup({ packName: "Languages", find: "Matukar", filter: {"source": "Glottolog", "@type": "Language"}}))
 

let promise = Promise.resolve(lookup_chained({ packName: "Languages", find: "Matukar", filter: {"source": "Glottolog", "@type": "Language"}}))
//let promise = Promise.resolve(lookup_chained({packName: "Languages", find: "atukar", filter: {"source": "Glottolog"}}))
//let promise = Promise.resolve(lookup_chained({ packName: "Glottolog", find: "atuk", filter: {"source": "Glottolog"}}))
//let promise = Promise.resolve(lookup_chained({ packName: "Languages", find: "Matukar", filter: {"source": "Glottolog", "@type": "Language"}})) 



promise.then(function(val) {
	
    console.log(val);
});
