// add all glottolog and all austlang languages to single dataset
// cross-reference the double entries

const fs = require('fs');
const { writeJson } = require("fs-extra");
const allLanguages = "./languages-main-data-pack.json";

const glottolog = require("./Glottolog-language-data/glottolog-language-data-pack.json");
const glottologOut = "./Glottolog-language-data/glottolog-language-data-pack.json";

const austlang = require("./Austlang-language-data/austlang-language-data-pack.json");
const austlangOut = "./Austlang-language-data/austlang-language-data-pack.json";

//console.log(glottolog)
//console.log(austlang)
(async () => {
	for (let i = 0; i < glottolog.length; i++) {
		
		if (glottolog[i]["containedInPlace"] == "Australia") {  // just in case if some other language has the same name as an Australian language
			
			for (let j = 0; j < austlang.length; j++) {
					
				if (austlang[j]["name"] == glottolog[i]["name"]) {
					
					
					// add ethnologue entry to austlang
					if (glottolog[i]["sameAs"].length > 0) {
						
						austlang[j]["sameAs"].push(glottolog[i]["sameAs"][0])
						
					}
					
					// add cross reference
					glottolog[i]["sameAs"].push({"@id": austlang[j]["@id"]})  // add austlang to glottolog entries
					
					austlang[j]["sameAs"].push({"@id": glottolog[i]["@id"]})  // add glottolog to austlang language
					

					console.log(glottolog[i])
				}	
			}
		}
		
		delete (glottolog[i]["containtInPlace"])
	}

	// write the individual packages
	writeJson(glottologOut, glottolog, {"spaces":4});  
	writeJson(austlangOut, austlang, {"spaces":4});  

	for (let m = 0; m < austlang.length; m++) {
		glottolog.push(austlang[m])
		
	}
	//console.log(glottolog.length)

	// write the combined package
	await writeJson(allLanguages, glottolog, {"spaces":4});
})();
