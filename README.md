# describo-data-packs

A repository to host data packs for use in Describo

- languages
- countries

## Update the data packages 

To update all data packs run the script update_all_packages.sh:

```
bash update_all_packages.sh
```

## Data structure

A data pack is simply a pre-defined array of JSON-LD objects that can be used as the value of a property. Consider a language definition:

```
[
    {
        "@id": "https://collection.aiatsis.gov.au/austlang/language/A38",
        "@type": "Language",
        "languageCode": "A38",
        "name": "Ngaanyatjarra",
        "geojson": {
            "@id": "#Ngaanyatjarra",
            "@type": "GeoCoordinates",
            "geojson": "{\"type\":\"Feature\",\"geometry\":{\"type\":\"Point\",\"coordinates\":[\"-25.80043240336\",\"127.35345751349\"]}}"
        },
        "source": "Austlang",
        "sameAs": [
            {
                "@id": "https://www.ethnologue.com/language/ntj"
            },
            {
                "@id": "https://glottolog.org/resource/languoid/id/ngaa1240"
            }
        ],
        "alternateName": "Ngaanjatjarra, Nana, I:nabadanggural, Jumudjara, Kalgonei, Kalgoneidjara, Kalguni, Kuwaratjara, Nangandjara, Nangaridjara, Ngaanjadjara, Ngan:adjara, Ngana, Nganadjara, Ngatari, Nona, Warburton Ranges, Ngadadjara, Ngaanyatjara, Warburton Ranges Dialect, Jabungadja, Ku:rara, Nadadjara, Nga:da, Nga:dapitjardi, Ngad adara, Ngadatara, Ngadatjara, Ngadawongga, Ngadjatara, Ngatatara, Ngatatjara, Rumudjara, Teitudjara, Wan:udjara, Warara, Wirtjandja, Witjandja"
    },
]
```

Rather than have a user enter in a language definition we can pre-populate a list of entries they can select from. 

