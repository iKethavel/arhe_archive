require('dotenv').config()
const mongoose = require('mongoose')

const _items = require('./items.json')
const _martialTraits = require('./martial_traits.json')
const _mysticalAbilities = require('./mystical_abilities.json')

const connectionOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}

const bootstrap = async () => {
  await mongoose.connect(
    `mongodb+srv://arhe1:${process.env.DB_PASS}@arhetericaclaster-5s8wz.mongodb.net/test?retryWrites=true&w=majority`, 
    connectionOptions
  )

  const { db } = mongoose.connection

  // await db.dropCollection('items')
  // await db.dropCollection('martialTraits')
  // await db.dropCollection('mysticalAbilities')

  await db.collection('items').insertMany(_items)
  await db.collection('martialTraits').insertMany(_martialTraits)
  await db.collection('mysticalAbilities').insertMany(_mysticalAbilities)

  console.log('Finished')
  process.exit(0)
}

bootstrap().catch(err => {
  console.error(err)

  process.exit(1);
});
