const lookup = require("./lookup.js")


//let promise = Promise.resolve(lookup({ packName: "Languages", find: "Matukar", filter: {"source": "Glottolog", "@type": "Language"}}))
//let promise = Promise.resolve(lookup({packName: "Languages", find: "atukar", filter: {"source": "Glottolog"}}))
//let promise = Promise.resolve(lookup({ packName: "Glottolog", find: "atuk", filter: {"source": "Glottolog"}}))
//let promise = Promise.resolve(lookup({ packName: "Languages", find: "Matukar", filter: {"source": "Glottolog", "@type": "Language"}})) 
let promise = Promise.resolve(lookup({ packName: "Languages", find: "li", filter: {"source": "Glottolog", "@type": "Language"}}))


promise.then(function(val) {
	
    console.log(val);
});
