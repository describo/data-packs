# Describo Data Packs

- [Describo Data Packs](#describo-data-packs)
  - [Working on the package - tests](#working-on-the-package---tests)
  - [Update the packages](#update-the-packages)
  - [Install the package](#install-the-package)
  - [Loading the data packs into elastic search](#loading-the-data-packs-into-elastic-search)
  - [Working with the package](#working-with-the-package)

A repository to host data packs for use in Describo. A data pack is simply a pre-defined array of
JSON-LD objects that can be used as the value of a property.

## Working on the package - tests

-   start elastic search docker container: `docker compose up`
-   Run the tests in watch mode: `npm run test:watch`

## Update the packages

To update all data packs run the script update_all_packages.sh:

```
bash update_all_packages.sh
```

## Install the package

```
npm install --save @arkisto/describo-data-packs
```

## Loading the data packs into elastic search

For development you can start a local elastic search service with:

```
docker compose up -d ; docker compose logs -f ; docker compose stop ; docker compose rm -f
```

Then in your application you can trigger a load of all of the data packs:

```
const { IndexDataPacks } = require('@arkisto/describo-data-packs')
const index = new IndexDataPacks({ elasticUrl: "http://localhost:9200" });
await index.load();
```

Or to do it once somewhere outside of your app with something like the script
`./bin/index-data-packs.js`

## Working with the package

```
const { DataPack } = require('@arkisto/describo-data-packs')
let datapack = new DataPack({ dataPacks: ['Austlang', 'Glottolog'], indexFields: ['@id', 'name']})
await datapack.load()


 let language = datapack.get({
    field: "name",
    value: "Nyaki Nyaki / Njaki Njaki",
});
```

Returns a JSON-LD snippet if a match is found.
