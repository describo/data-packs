#!/bin/sh

# update Austlang data pack
cd languages
cd Austlang-language-data
node create-language-data-set.js
cd ..

# update Glottolog dataset
cd Glottolog-language-data
node create-language-data-set.js
cd ..

# crossreference austlang and glottolog data packs and
# create main language data pack
node languages_crossref_glotto_austlang.js
cd ..

# update country data set
cd countries/ISO-639-6-country-data
node create-country-data-pack
cd ..
node countries_create_main_dataset.js
cd ..

