#!/bin/sh

HOME=$PWD

# update Austlang data pack
echo "Getting Austlang Data"
cd data-packs/languages/Austlang-language-data
node create-language-data-set.js
cd $HOME

# update Glottolog dataset
echo "Getting Glottolog Data"
cd data-packs/languages/Glottolog-language-data
node create-language-data-set.js
cd $HOME

# update ethnologue dataset
echo "Getting Ethnologue Data"
cd data-packs/languages/ISO-639-3-language-data
node create-language-data-pack.js
cd $HOME

# crossreference austlang and glottolog data packs and
echo "Cross referencing language datasets and making data packs"
cd data-packs/languages
node cross-reference-languages.js
cd $HOME

# update country data set
echo "Getting Country Data and making data pack"
cd data-packs/countries
node create-country-data-pack


