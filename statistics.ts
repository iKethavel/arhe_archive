import { config } from 'dotenv'
import * as mongoose from 'mongoose'
const fs = require('fs');

const connectionOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
}

const bootstrap = async () => {
  await mongoose.connect(
    `mongodb+srv://arhe1:123123123@arhetericaclaster-5s8wz.mongodb.net/test2?retryWrites=true&w=majority`,
    connectionOptions
  )

  const { db } = mongoose.connection

  // console.log((await db.collections()).map(c => c.countDocuments((data) => { console.log(data) })))
  const data = await (await db.collection('characters').find().toArray()).map(c => c.attributes.map(a => ({
    title: a.title,
    talents: a.talents.map(t => t.title)
  })))

  fs.writeFileSync('attributes.json', JSON.stringify(data))

  console.log('Finished')
  process.exit(0)
}

bootstrap().catch(err => {
  console.error(err)

  process.exit(1);
});
