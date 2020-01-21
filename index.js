require('dotenv').config();
const mongoose = require('mongoose');

const _items = require('./items.json')

const connectionOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}

mongoose
.connect(
  `mongodb+srv://arhe1:${process.env.DB_PASS}@arhetericaclaster-5s8wz.mongodb.net/test?retryWrites=true&w=majority`, 
  connectionOptions)
.then(_mongoose => {
  const { db } = _mongoose.connection;

  db.dropCollection('items')
  db.collection('items').insertMany(_items)

}).then(() => {
  console.log('Finished')
  // process.exit(0);
})
.catch(console.error)
