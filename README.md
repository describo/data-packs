# Describo Data Packs

- [Describo Data Packs](#describo-data-packs)
  - [Update the packages](#update-the-packages)
  - [Working with the package](#working-with-the-package)

A repository to host data packs for use in Describo. A data pack is simply a pre-defined array of
JSON-LD objects that can be used as the value of a property.

## Update the packages

To update all data packs run the script update_all_packages.sh:

```
bash update_all_packages.sh
```

## Working with the package

```
npm install --save arkisto/describo-data-packs


const { DataPack } = require('@arkisto/describo-data-packs')
let datapack = new DataPack({ dataPacks: ['Austlang', 'Glottolog'], indexFields: ['@id', 'name']})
await datapack.load()


 let language = datapack.get({
    field: "name",
    value: "Nyaki Nyaki / Njaki Njaki",
});
```

Returns a JSON-LD snippet if a match is found.
