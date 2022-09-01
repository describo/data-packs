const fetchURL = require("cross-fetch");
//const dataPackList = ["https://raw.githubusercontent.com/Arkisto-Platform/describo-data-packs/698c16a6b35dc9179cac7c6d794186e10396649c/Glottolog-language-data/glottolog-language-data-pack.json"]
const dataPackList = ["https://raw.githubusercontent.com/Arkisto-Platform/describo-data-packs/698c16a6b35dc9179cac7c6d794186e10396649c/Austlang-language-data/austlang-language-data-pack.json", "https://raw.githubusercontent.com/Arkisto-Platform/describo-data-packs/698c16a6b35dc9179cac7c6d794186e10396649c/Glottolog-language-data/glottolog-language-data-pack.json"]

class Lookup {
  
  constructor({ dataPacks = [], indexFields = [] }) {
    this.dataPacks = dataPacks;
    this.indexFields = indexFields;
    this.dataArray = []	
	this.index = []
  }

  // fetch data and creat index and dataArray
  // there are one or more urls. All data from all urls are added to a single array
  async fetch() {
    
    this.indexFields.forEach((field) => (this.index[field] = {}));

    for (const url of this.dataPacks) {

      try {
        const res = await fetchURL(url);

        if (res.status >= 400) {
          throw new Error("Bad response from server");
        }

        const response = await res.json();
      
        for (const object of response) {
		  
          // populate data array	  
          this.dataArray.push(object);
	  
	      // creat index. One dict per indexField
          for (const field of this.indexFields) {
			  
		    if (field == "name") {

              this.index["name"][object["name"].trim()] = object;

            } else if ((field == "alternateName") && object["alternateName"]) {

              // alternateName is a sting-list of names. Each name becomes an index
              for (const altName of object['alternateName'].split(",")) {

                this.index[field][altName.trim()] = object;
				
              }
            }
          } 
        } 
      } catch (err) {
        console.error(err);
      }  
    }
	console.log("No. of Objects: " + this.dataArray.length);
    console.log("No. of Indices: " + Object.keys(this.index).length);
  }
  
  async get({ field, value }) {

    return this.index[field][value];
  }
  
  // perform a query against an elastic search index
  query({ elastic, query }) {
	  // TO DO 
  }
  
  
}
module.exports = Lookup;

let langus = new Lookup({ dataPacks: dataPackList, indexFields: ['name', 'alternateName']})
langus.fetch()



setTimeout(function(){
	//console.log(langus.index)
	//writeJson(outfile, langus.index, {"spaces":4});
	let found = langus.get({'field': "name", 'value': 'Linngithigh'})
    //let found = langus.get({'field': "alternateName", 'value': 'Koko papung'})
	console.log(found)
}, 4000);