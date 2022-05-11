//We get the mapping from AIATSIS to Glottolog from Chirila:
//http://chirila.yale.edu/


const dataHTML = "http://chirila.yale.edu/languages"
const languagePack = "./chirilla_mapping.json";
const fetch = require("cross-fetch");
const { writeJson } = require("fs-extra");
var http = require('http');


(async () => {
    let response = await fetch(dataHTML, { cache: "reload" });
    if (response.status !== 200) {
        throw new Error(response);
    }
    response = await response.text();
    
	const languageData = [];
	
	itemList = response.split('<tr><td class="langname">')
	
	let cells, name, iso, glotto, austlang;
	
	for (let i = 1; i < itemList.length; i++) {
		cells = itemList[i].split(">")
		name = cells[1].slice(0 , -4);
		iso = cells[8].slice(0 , -4)
		glotto = cells[10].slice(0 , -4)
		austlang = cells[12].slice(0 , -4)
		
		console.log(name, iso, glotto, austlang)
		

		languageData.push({
			"name": name,
			"iso": iso,
			"glotto": glotto,
			"austlang": austlang,
		});
            
		
	}

    await writeJson(languagePack, languageData);
	console.log("number of languages", languageData.length)
    //console.log(itemList)
})();