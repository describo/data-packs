# describo-data-packs

A repository to host data packs for use in Describo


A data pack is simply a pre-defined array of JSON-LD objects that can be used as the value of a property. Consider a country definition:

[
  {
      "@type":"Country",
      "@id":"https://www.ethnologue.com/country/AD",
      "name":"Andorra",
      "alternateName":"AD"
  }
]

Rather than have a user enter in a country definition we can pre-populate a list of entries they can select from. 
In this case, a countries list has been produced from the data at www.ethnologue.com and made 
available at https://raw.githubusercontent.com/UTS-eResearch/describo-data-packs/master/ISO-639-6-country-data/iso-639-6-country-data-pack.json.
