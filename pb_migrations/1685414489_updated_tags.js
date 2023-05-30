migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("kntjyvn7bfj35qw")

  collection.indexes = [
    "CREATE UNIQUE INDEX `idx_ZhsRgxz` ON `tags` (`name`)"
  ]

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("kntjyvn7bfj35qw")

  collection.indexes = []

  return dao.saveCollection(collection)
})
