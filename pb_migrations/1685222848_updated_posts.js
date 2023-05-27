migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("187ppy14gidv9io")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "i2mpmbej",
    "name": "content",
    "type": "editor",
    "required": true,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("187ppy14gidv9io")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "i2mpmbej",
    "name": "content",
    "type": "editor",
    "required": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
})
