const fetch = require("cross-fetch");
const _ = require("lodash")
const links = require("./index")
const datapacks = links.datapacks

function lookup({ packName, find, fields = ['@id', 'name', 'alternateName' ], filter}) {
  // find a substring within the objects in the data pack and list the matches
  // packName: data pack
  // find: string to be found
  // fields: list where should be searched
  // filter: dictionary of filters 


  function fieldFinder(item, field) {	
	// check first if fields exist and are not undefined
	if ((field in item) && (!_.isNil(item[field])))	{
      if (item[field].includes(find)) {
		matchedItems.push(item); 
	  };
	};	   
  };
	

  let matchedItems = []
  
  packName = datapacks[packName]

  // get array into consistent type: list of strings
  let datapackList = _.flatten([packName]);
  
  // get all urls 
  let urls = datapackList.map(pack => datapacks[pack] ||= pack);

  // open each file
  let dataJSON = Promise.all(urls.map(url => fetch(url)
  
  // get the actual JSON data out of each file
  .then(e => e.json())))

  // flatten the data into a single list object
  .then(data => {return data.flat()})

  // filter data pack for each of the set key, value pairs in filter
  .then(function(result) {
    if (typeof filter !== 'undefined') {
	  for (const [key, value] of Object.entries(filter)) {
	    result = _.filter(result, function(o) { return o[key] == value; });
	  };
	};
    return result
  })
  
  // find each field where the query string is searched
  .then(function(result) {
	_.forEach(result, function(data) {
	  _.forEach(fields, function(field) {
		fieldFinder(data, field);
	  });
	});	
	return _.uniq(matchedItems);
  });	  
  return dataJSON	
}

/*
let promise = Promise.resolve(lookup({ packName: "Languages", find: "Matukar", filter: {"source": "Glottolog", "@type": "Language"}}))
 
promise.then(function(val) {
    console.log(val);
});
*/
module.exports = lookup
