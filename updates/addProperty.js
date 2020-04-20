const fs = require('fs')
const R = require('ramda')


const collection = JSON.parse(fs.readFileSync('./items.json').toString())

const updated = collection
  .map(item => !R.has('capacity', item) ? { ...item, capacity: 0} : item)

console.log(updated)

fs.writeFileSync('./update.json', JSON.stringify(updated))
