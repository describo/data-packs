const fetch = require("cross-fetch");
const _ = require("lodash")
const links = require("./index")
const datapacks = links.datapacks


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
    let dataJson = JSON.parse(response);
    return dataJson;
  };


  async function lookupDataFiles(linkList) {
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
	  matchedItems.push(item)  
    };
  };
  
  
  function fieldFinder(item, field) {	
	// check first if fields exist and are not undefined
	if ((field in item) && (!_.isNil(item[field])))	{
	  itemMatcher(item, field)
	};	   
  };


  async function finder(fields, filteredData) {
    // compare all fields of all dataitems
	_.forEach(filteredData, function(data) {
		_.forEach(fields, function(field) {
			fieldFinder(data, field);
		});
	});
  return matchedItems;
  };
  

  let linkList = getDataLinks(packName);
  let dataset = await lookupDataFiles(linkList);
  let filteredData = await filterData(dataset, filter);
  let matches = _.uniq(await finder(fields, filteredData)) //
  console.log(matches);
  return matches
};

module.exports = datapackLookup

//datapackLookup({ packName: datapacks["Languages"], find: "Matukar", filter: {"source": "Austlang", "@type": "Language"}})
//datapackLookup({ packName: "Languages", find: "Matukar", filter: {"source": "Glottolog", "@type": "Language"}})
//datapackLookup({ packName: datapacks["Languages"], find: "atuk", filter: {"source": "Glottolog", "@type": "Language"}})
//datapackLookup({ packName: "Glottolog", find: "Ger"})
datapackLookup({ packName: "Country", find: "Aus"})