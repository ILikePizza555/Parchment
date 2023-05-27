migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("187ppy14gidv9io")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "w9eejtgv",
    "name": "title",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("187ppy14gidv9io")

  // remove
  collection.schema.removeField("w9eejtgv")

  return dao.saveCollection(collection)
})
