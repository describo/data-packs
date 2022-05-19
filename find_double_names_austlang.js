var data_austlang = require("./Austlang-language-data/austlang-language-data-pack.json")

nameList = []
for (let i = 0; i < data_austlang.length; i++) {
	console.log(data_austlang[i]["name"])
	if (!(data_austlang[i]["name"] in nameList)) {
		
		nameList.push(data_austlang[i]["name"])
		
	} else {
		console.log(data_austlang[i]["name"])
		
	}
	
}

//console.log(nameList)