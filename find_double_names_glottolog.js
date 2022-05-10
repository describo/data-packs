var data_glottolog = require("./Glottolog-language-data/glottolog-language-data-pack.json")

nameList = []
for (let i = 0; i < data_glottolog.length; i++) {
	if (!(data_glottolog[i]["name"] in nameList)) {
		
		nameList.push(data_glottolog[i]["name"])
		
	} else {
		console.log(data_glottolog[i]["name"])
		
	}
	
}

//console.log(nameList)