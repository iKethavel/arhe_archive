require('dotenv').config()
const mongoose = require('mongoose')

const collectionsToEdit = [
  {
    name: 'items',
    collection: require('./items.json'),
  },
  {
    name: 'martialTraits',
    collection: require('./martial_traits.json'),
  },
  {
    name: 'mysticalAbilities',
    collection: require('./mystical_abilities.json'),
  },
  {
    name: 'metamorphoses',
    collection: require('./metamorphoses.json'),
  },
  {
    name: 'martialArts',
    collection: require('./martial_arts.json')
  },
  {
    name: 'madnesses',
    collection: require('./mad.json') // TODO replace here!
  }
]

const connectionOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
}

const bootstrap = async () => {
  await mongoose.connect(
    `mongodb+srv://arhe1:${process.env.DB_PASS}@arhetericaclaster-5s8wz.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`, 
    connectionOptions
  )

  const { db } = mongoose.connection

  const collectionsInDB = await db
    .listCollections()
    .toArray()
  // console.log('All: ', collectionsInDB)
  
  const collectionsToDrop = collectionsInDB
    .filter(c => collectionsToEdit.map(coll => coll.name).includes(c.name))
    .map(c => c.name)
  console.log('To drop: ', collectionsToDrop)

  await Promise.all(collectionsToDrop.map(collection => {
    console.log(collection)
    return db.dropCollection(collection)
  }))

  await Promise.all(collectionsToEdit.map(coll => db.collection(coll.name).insertMany(coll.collection)))

  console.log('Finished')
  process.exit(0)
}

bootstrap().catch(err => {
  console.error(err)

  process.exit(1);
});
