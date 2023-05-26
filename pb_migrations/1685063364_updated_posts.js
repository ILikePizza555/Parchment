migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("187ppy14gidv9io")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "cy0a2joi",
    "name": "original_poster",
    "type": "relation",
    "required": true,
    "unique": false,
    "options": {
      "collectionId": "_pb_users_auth_",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("187ppy14gidv9io")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "cy0a2joi",
    "name": "original_poster",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "_pb_users_auth_",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
})
