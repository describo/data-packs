const fetch = require("cross-fetch");
const _ = require("lodash")
const { datapacks } = require("./index.js")


function lookup( { packName, find, fields = ['@id', 'name', 'alternateName' ], filter = {}} ) {
  /** 
   * find a substring within the objects in the data pack and list the matches
   * packName: name of dataset in json format 
   * find: string to be found in the object
   * fields: list of fields where "find" should be searched
   * filter: dictionary of filters:  {"field":"value"}
   */

  
  function findInField(item, field) {	
	// fields need to exist and need to be defined to be searched
	if ((field in item) && (!_.isNil(item[field])))	{
      if (item[field].includes(find)) {
		matchedItems.push(item); 
	  };
	};	   
  };
	

  let matchedItems = [];  // for search results
  
  // get array into consistent type: list of strings
  let datapackList = _.flatten([datapacks[packName]]); 
  let urls = datapackList.map(pack => datapacks[pack] ||= pack);

  // open each file
  // get the actual JSON data out of each file
  let dataJSON = Promise.all(urls.map(url => fetch(url)
  .then(e => e.json())))
  
  // flatten the data into a single list object
  .then(data => {return data.flat()})

  // filter data pack for each of the set key, value pairs in filter
  .then(function(dataFull) {
    if (typeof filter !== 'undefined') {
	  for (const [key, value] of Object.entries(filter)) {
	    result = _.filter(dataFull, function(o) { 
		  return o[key] == value; 
		});
	  };
	};
    return result;
  })
  
  // find each field where the query string is searched
  .then(function(result) {
	_.forEach(result, function(item) {
	  _.forEach(fields, function(field) {
		findInField(item, field);
	  });
	});	
	return _.uniq(matchedItems);
  });	  
  return dataJSON;	
};

/*
let promise = Promise.resolve(lookup({ packName: "Languages", find: "Matukar", filter: {"source": "Glottolog", "@type": "Language"}}))
 
promise.then(function(val) {
    console.log(val);
});
*/
module.exports = lookup
