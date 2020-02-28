require('dotenv').config()
const mongoose = require('mongoose')

const _items = require('./items.json')
const _martialTraits = require('./martial_traits.json')
const _mysticalAbilities = require('./mystical_abilities.json')
const _metamorphoses = require('./metamorphoses.json')

const collectionsToEdit = [
  'items',
  'martialTraits',
  'mysticalAbilities',
  'metamorphoses',
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
  console.log('All: ', collectionsInDB)

  
  
  const collectionsToDrop = collectionsInDB
    .filter(c => collectionsToEdit.includes(c.name))
    .map(c => c.name)
  console.log('To drop: ', collectionsToDrop)

  collectionsToDrop.map(async collection => {
    console.log(collection)
    await db.dropCollection(collection)
  })

  await db.collection('items').insertMany(_items)
  await db.collection('martialTraits').insertMany(_martialTraits)
  await db.collection('mysticalAbilities').insertMany(_mysticalAbilities)
  await db.collection('metamorphoses').insertMany(_metamorphoses)

  console.log('Finished')
  process.exit(0)
}

bootstrap().catch(err => {
  console.error(err)

  process.exit(1);
});
