migrate((db) => {
  const collection = new Collection({
    "id": "187ppy14gidv9io",
    "created": "2023-05-26 01:08:19.693Z",
    "updated": "2023-05-26 01:08:19.693Z",
    "name": "posts",
    "type": "base",
    "system": false,
    "schema": [
      {
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
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("187ppy14gidv9io");

  return dao.deleteCollection(collection);
})
