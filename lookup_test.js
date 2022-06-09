
const lookup = require("./lookup_datapack.js")

//let promise = Promise.resolve(lookup({ packName: "Country", find: "Ger"}));
 
//let promise = Promise.resolve(lookup({ packName: "Languages", find: "Matukar", filter: {"source": "Glottolog", "@type": "Language"}}))
//let promise = Promise.resolve(lookup({packName: "Languages", find: "nga", filter: {"source": "Austlang"}}))
let promise = Promise.resolve(lookup({ packName: "Languages", find: "atuk", filter: {"source": "Glottolog", "@type": "Language"}}))
 
promise.then(function(val) {
    console.log(val);
});
