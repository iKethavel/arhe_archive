require('dotenv').config()
const mongoose = require('mongoose')

const connectionOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
}

const DEFAULT_PORTRAIT = 'https://i.imgur.com/LTv6g4a.gif'

const bootstrap = async () => {
  await mongoose.connect(
    `mongodb+srv://arhe1:${process.env.DB_PASS}@arhetericaclaster-5s8wz.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
    connectionOptions
  )

  const { db } = mongoose.connection

  const data = await db.collection('characters').updateMany(
    { portrait: { $eq: '' } },
    { $set: { portrait: DEFAULT_PORTRAIT } }
  )
  console.log(data)
  // const collectionsInDB = await db
  //   .listCollections()
  //   .toArray()
  // // console.log('All: ', collectionsInDB)

  // const collectionsToDrop = collectionsInDB
  //   .filter(c => collectionsToEdit.map(coll => coll.name).includes(c.name))
  //   .map(c => c.name)
  // console.log('To drop: ', collectionsToDrop)

  // await Promise.all(collectionsToDrop.map(collection => {
  //   console.log(collection)
  //   return db.dropCollection(collection)
  // }))

  // await Promise.all(collectionsToEdit.map(coll => db.collection(coll.name).insertMany(coll.collection)))

  console.log('Finished')
  process.exit(0)
}

bootstrap().catch(err => {
  console.error(err)

  process.exit(1);
});
