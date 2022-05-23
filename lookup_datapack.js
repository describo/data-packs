
//  * packName: name of the data pack: e.g. countries, languages, camera's etc
//  * find: query string - lookup in @id and name fields
  
  

//export function lookup({ packName, find }) {
const languages = require("./languages-main-data-pack.json")
const countries = require("./country-main-data-pack.json")

export function lookup(packName, find, quantity) {
	// find substring in items in datapack

	var matchedItems = []
	
	function itemFound(item) {
		if (!(item in matchedItems)) {
		    matchedItems.push(item);
		}
	}
	
	for (let i = 0; i < packName.length; i++) {
		
	    var item = packName[i];
		
		// look in names
		if (item["name"].startsWith(find)) {
			itemFound(item);
			
		// look in IDs
		} else if (item["@id"].includes(find)) {
			itemFound(item);
		
		// look in alternate Names
		} else if (("alternateName" in item) && 
		    (typeof item["alternateName"] !== 'undefined') && 
			(item["alternateName"].includes(find))) {
				itemFound(item);		
		}
 
		if (matchedItems.length >= quantity) {
			return matchedItems;	
	    }  			
	}
	
	return matchedItems
};

var matchedLanguages = lookup(languages, "A", 10)
var matchedCountries = lookup(countries, "An", 2)
//console.log(matchedLanguages)
//console.log(matchedCountries)