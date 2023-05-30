migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("kntjyvn7bfj35qw")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "t7eur015",
    "name": "name",
    "type": "text",
    "required": true,
    "unique": false,
    "options": {
      "min": null,
      "max": 64,
      "pattern": "^[\\w-]+$"
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("kntjyvn7bfj35qw")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "t7eur015",
    "name": "name",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": 64,
      "pattern": "^[\\w-]+$"
    }
  }))

  return dao.saveCollection(collection)
})
