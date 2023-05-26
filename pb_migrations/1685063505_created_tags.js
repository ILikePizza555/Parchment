migrate((db) => {
  const collection = new Collection({
    "id": "kntjyvn7bfj35qw",
    "created": "2023-05-26 01:11:45.953Z",
    "updated": "2023-05-26 01:11:45.953Z",
    "name": "tags",
    "type": "base",
    "system": false,
    "schema": [
      {
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
  const collection = dao.findCollectionByNameOrId("kntjyvn7bfj35qw");

  return dao.deleteCollection(collection);
})
