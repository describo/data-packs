#!/bin/sh

cd languages

# update Austlang data pack
echo "Getting Austlang Data"
cd Austlang-language-data
node create-language-data-set.js
cd ..

# update Glottolog dataset
echo "Getting Glottolog Data"
cd Glottolog-language-data
node create-language-data-set.js
cd ..

# update ethnologue dataset
echo "Getting Ethnologue Data"
cd ISO-639-3-language-data
node create-language-data-pack.js
cd ..

# crossreference austlang and glottolog data packs and
echo "Cross referencing language datasets"
node cross-reference-languages.js
cd ..

# update country data set
echo "Getting Country Data"
cd countries
node create-country-data-pack

