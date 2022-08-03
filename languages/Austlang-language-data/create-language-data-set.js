const data = "https://data.gov.au/data/dataset/70132e6f-259c-4e0f-9f95-4aed1101c053/resource/e9a9ea06-d821-4b53-a05f-877409a1a19c/download/aiatsis_austlang_endpoint_001.csv"

const languagePack = "./austlang-language-data-pack.json";
const fetch = require("cross-fetch");
const { writeJson } = require("fs-extra");

// Return array of string values, or NULL if CSV string not well formed.
// https://gist.github.com/rakeden/508ca124fabe97eba6d5734f2efcea32

function CSVtoArray(strData, strDelimiter) {
    // Check to see if the delimiter is defined. If not,
  // then default to comma.
  strDelimiter = (strDelimiter || ",");

  // Create a regular expression to parse the CSV values.
  var objPattern = new RegExp(
    (
      // Delimiters.
      "(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +

      // Quoted fields.
      "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +

      // Standard fields.
      "([^\"\\" + strDelimiter + "\\r\\n]*))"
    ),
    "gi"
  );


  // Create an array to hold our data. Give the array
  // a default empty first row.
  var arrData = [[]];

  // Create an array to hold our individual pattern
  // matching groups.
  var arrMatches = null;


  // Keep looping over the regular expression matches
  // until we can no longer find a match.
  while (arrMatches = objPattern.exec(strData)) {

    // Get the delimiter that was found.
    var strMatchedDelimiter = arrMatches[1];

    // Check to see if the given delimiter has a length
    // (is not the start of string) and if it matches
    // field delimiter. If id does not, then we know
    // that this delimiter is a row delimiter.
    if (
      strMatchedDelimiter.length &&
      strMatchedDelimiter !== strDelimiter
    ) {

      // Since we have reached a new row of data,
      // add an empty row to our data array.
      arrData.push([]);

    }

    var strMatchedValue;

    // Now that we have our delimiter out of the way,
    // let's check to see which kind of value we
    // captured (quoted or unquoted).
    if (arrMatches[2]) {

      // We found a quoted value. When we capture
      // this value, unescape any double quotes.
      strMatchedValue = arrMatches[2].replace(
        new RegExp("\"\"", "g"),
        "\""
      );

    } else {

      // We found a non-quoted value.
      strMatchedValue = arrMatches[3];

    }


    // Now that we have our value string, let's add
    // it to the data array.
    arrData[arrData.length - 1].push(strMatchedValue);
  }

  // Return the parsed data.
  return (arrData);
}



(async () => {
	

    let response = await fetch(data, { cache: "reload" });
    if (response.status !== 200) {
        throw new Error(response);
    }
    response = await response.text();

	responseArray = CSVtoArray(response, ",")
	
	//console.log(responseArray)
    const languageData = [];


	
    for (let item of responseArray) {
		if (item[0] == "language_code") continue;

        let languageCode, name, alternativeNames, latitude, geojson, longitude;
        try {
			if (item[0]) {  // ignore empty line in the dataset

				languageCode = item[0];
				console.log(item[1])
				name = item[1].trim();
				alternativeNames = item[2];
				latitude = "";
				
				latitude = item[5] || ""   // some languages don't have a latitude property
				longitude = item[6] || ""  // some languages don't have a longitude property
				
				var geoj = {"type": "Feature",
				  "name": name,
				  "geometry": {
					"type": "GeoCoordinates",
					"coordinates": [latitude, longitude]
				  }}			
				
				var geoLocation = {
				  "@id": "#" + name,
				  "@type": "GeoCoordinates",
				  "geojson": JSON.stringify(geoj)};
				
				if (name && languageCode) {
					languageData.push({
						"@id": `https://collection.aiatsis.gov.au/austlang/language/${languageCode}`,
						"@type": "Language",
						languageCode,
						name,
						geojson: geoLocation,
						source: "Austlang",
						sameAs: [],
						alternateName: alternativeNames,
					});
				}
			}
        } catch (error) {
            console.log(error.message);
        }
    }

    await writeJson(languagePack, languageData, {"spaces":4});
})();