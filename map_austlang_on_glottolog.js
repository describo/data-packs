var data_glottolog = require("./Glottolog-language-data/glottolog-language-data-pack.json")
var data_austlang = require("./Austlang-language-data/austlang-language-data-pack.json")

const languageMainPack = "./language-data-main.json";
const { writeJson } = require("fs-extra");


var languageData = [];
var austlangUnmatched = []


function updateSameAs(glottologItem, element) {
	var IDdict = {"@Id": element["@id"]}
	glottologItem["sameAs"].push(IDdict)
	glottologItem["alternateName"] = element["alternateName"]
	languageData.push(glottologItem)
}

function addMatchingItem(glottologItem, element) {
	if (element["name"].includes(glottologItem["name"])) {
				
		//console.log(glottologItem["name"]);
		updateSameAs(glottologItem, element)					
	} 
}

function findMatch(element) {
	
	for (let i = 0; i < data_glottolog.length; i++) {
		
		var glottologItem = data_glottolog[i]

		if (glottologItem["containtInPlace"] == "Australia") {
			
			addMatchingItem(glottologItem, element)
	
	    }
	}	
}

data_austlang.forEach(element => findMatch(element));
    
//writeJson(languageMainPack, languageData);

//console.log(data_glottolog) 
console.log(languageData)
writeJson(languageMainPack, languageData);
//console.log(austlangUnmatched)
console.log(languageData.length)
console.log(data_austlang.length)