migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("kntjyvn7bfj35qw")

  collection.viewRule = ""

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("kntjyvn7bfj35qw")

  collection.viewRule = null

  return dao.saveCollection(collection)
})
