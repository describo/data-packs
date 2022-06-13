const fetch = require("cross-fetch");
const _ = require("lodash")
const { datapacks } = require("./index.js")


async function datapackLookup({ packName, find, fields = ['@id', 'name', 'alternateName' ], filter}) {
  // find a substring within the objects in the data pack and list the matches
  // packName: data pack
  // find: string to be found
  // fields: list where should be searched
  // filter: dictionary of filters 

  let matchedItems = []
  
  packName = datapacks[packName]

  function getDataLinks(datapack) {
	// returns list of one or more links
    let datapackList = _.flatten([datapack]);
	return datapackList.map(pack => datapacks[pack] ||= pack);
  };

  
  async function getDataJson(packName) {
    // get json data from files
    let response = await fetch(packName, { cache: "default" });  //default checks in cache first
    
	if (response.status !== 200) {
	  throw new Error(response);
    };
	
    response = await response.text();
    return JSON.parse(response);
  };


  async function getDataFiles(linkList) {
    // get content of all linked json files into one array
    let dataCollection = [];
    
    for (const file of linkList) {
	  dataCollection.push(await getDataJson(file));
    };

    return _.flatten(dataCollection);
  };


  async function filterData(dataset, filter) {
    // filter data pack for each of the set key, value pairs in filter
	
    if (typeof filter !== 'undefined') {
		
	  for (const [key, value] of Object.entries(filter)) {
	    dataset = _.filter(dataset, function(o) { return o[key] == value; });
	  };
    };
  return dataset;
  };
  

  function itemMatcher(item, field) {
    // find items that match, add item if not already in matchedItems
    if (item[field].includes(find)) {
	  matchedItems.push(item); 
    };
  };
  
  
  function fieldFinder(item, field) {	
	// check first if fields exist and are not undefined
	if ((field in item) && (!_.isNil(item[field])))	{
	  itemMatcher(item, field);
	};	   
  };


  async function finder(fields, filteredData) {
    // compare all fields of all dataitems
	_.forEach(filteredData, function(data) {
		_.forEach(fields, function(field) {
			fieldFinder(data, field);
		});
	});
  return _.uniq(matchedItems);
  };
  

  let linkList = await getDataLinks(packName);
  let dataset = await getDataFiles(linkList);
  let filteredData = await filterData(dataset, filter);
  let matches = finder(fields, filteredData) //
  
  return matches
};


module.exports = datapackLookup

//datapackLookup({ packName: "Languages", find: "Matukar", filter: {"source": "Austlang", "@type": "Language"}})
//datapackLookup({ packName: "Languages", find: "Matukar", filter: {"source": "Glottolog", "@type": "Language"}})
//datapackLookup({ packName: "Languages", find: "atuk", filter: {"source": "Glottolog", "@type": "Language"}})
//datapackLookup({ packName: "Glottolog", find: "Ger"})
//datapackLookup({ packName: "Country", find: "Aus"})