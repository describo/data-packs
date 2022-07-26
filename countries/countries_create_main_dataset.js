var data_country = require("./ISO-639-6-country-data/iso-639-6-country-data-pack.json")
var countryISOMapping = require("./ISO-639-6-country-data/mapping-iso3-iso2.json") // from https://github.com/vtex/country-iso-3-to-2
const geoJSONfile = "./geoJSON-data/archive/countries.geojson"

const countryPack = "./countries-main-data-pack.json";
const fetch = require("cross-fetch");
const { writeJson } = require("fs-extra");
const fs = require('fs');

fs.readFile(geoJSONfile, "utf8", (err, jsonString) => {
  if (err) {
    console.log("File read failed:", err);
    return;
  }
  const geoJSON = JSON.parse(jsonString);
  
  for (let i = 0; i < geoJSON["features"].length; i++) {
	  // add iso3 code to countries
	  // add geodata to countries 
	  
	  geoData = geoJSON["features"][i]//["geometry"]
	  
	  
	  
	  iso_3 = geoJSON["features"][i]["properties"]["ISO_A3"]
	  iso_2 = countryISOMapping[iso_3]
	  
	  for (let j = 0; j< data_country.length; j++) {

		  if (data_country[j]["alternateName"] == iso_2) {
			
			var name = data_country[j]['name']
			var geoLocation = {
			  "@id": "#" + name,
			  "@type": "GeoShape",
			  "geojson": JSON.stringify(geoData)};
			
			//data_country[j]['iso_3'] = iso_3;
            data_country[j]['geojson'] = geoLocation;
            
		  }   		  
	  } 
  };
  console.log(data_country)
  writeJson(countryPack, data_country, {"spaces":4});
});
