const languages = require("./languages-main-data-pack.json")
const countries = require("./country-main-data-pack.json")
var _ = require('lodash');

function lookup({ packName, find, fields = ['@id', 'name', 'alternateName' ], filter}) {
	// find a substring within the objects in the data pack and list the matches
	// packName: data pack
	// find: string 
	// fields: Array list where should be searched
	// filter: dictionary of filters
	
	console.log(fields)
	var matchedItems = []
	
	
	// add matched items to matchedItems
	function itemFound(item) {
		if (!matchedItems.includes(item)) {	
		    matchedItems.push(item);
		}	
	}
	
	
	function itemFinder(item, field) {
		// find items that match
		if (
		   (field in item) &&
		   (typeof item[field] !== 'undefined') &&
		   (item[field].includes(find))
		   ) {
                itemFound(item)
		   }	   
	}
	
	
	// filter data pack for each of the set key, value pairs in filter
	if (typeof filter !== 'undefined') {
		for (const [key, value] of Object.entries(filter)) {
			if (key in packName) {
				packName = _.filter(packName, function(o) { return o[key] == value; });
			}
		}
	}

    
	// for each field in each data item
	for (let i = 0; i < packName.length; i++) {

		// search fields in datapack
		for (let j = 0; j < fields.length; j++) {
			itemFinder(packName[i], fields[j]);
		}				
	}
	
	return matchedItems;
}

//foundItems  = lookup({ packName: languages, find: "Matukar", filter: {"source": "Glottolog", "@type": "Language"}})
//foundItems  = lookup({ packName: languages, find: "alu", filter: {"source": "Austlang"}})
//foundItems  = lookup({ packName: languages, find: "Matukar (Mel"})
//foundItems  = lookup({ packName: countries, find: "Papu"})
//foundItems  = lookup({ packName: countries, find: "PNG", fields: ["iso_3"]})
foundItems  = lookup({ find: "PNG", fields: ["iso_3"], packName: countries})
console.log(foundItems)
//console.log(foundItems.length)