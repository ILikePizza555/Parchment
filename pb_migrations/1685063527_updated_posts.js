migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("187ppy14gidv9io")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "sruvak9l",
    "name": "tags",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "kntjyvn7bfj35qw",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": [
        "name"
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("187ppy14gidv9io")

  // remove
  collection.schema.removeField("sruvak9l")

  return dao.saveCollection(collection)
})
