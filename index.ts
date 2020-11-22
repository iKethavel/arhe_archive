import { config } from 'dotenv'
import * as mongoose from 'mongoose'

config()

import items from './items'
import martial_traits from './martial_traits'
import mystical_abilities from './mystical_abilities'
import metamorphoses from './metamorphoses'
import martial_arts from './martial_arts'
import madnesses from './madnesses'
import injuries from './injuries'

const collectionsToEdit = [
  {
    name: 'items',
    collection: items,
  },
  {
    name: 'martialTraits',
    collection: martial_traits,
  },
  {
    name: 'mysticalAbilities',
    collection: mystical_abilities,
  },
  {
    name: 'metamorphoses',
    collection: metamorphoses,
  },
  {
    name: 'martialArts',
    collection: martial_arts,
  },
  {
    name: 'madnesses',
    collection: madnesses,
  },
  {
    name: 'injuries',
    collection: injuries,
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
