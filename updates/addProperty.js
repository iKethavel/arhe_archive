const fs = require('fs')
const R = require('ramda')

const FILE_NAME = 'metamorphoses'

const collection = JSON.parse(fs.readFileSync(`./${FILE_NAME}.json`).toString())

// const updated = collection
//   .map(item => !R.has('extras', item) ? { ...item, extras: [] } : item)

const updated = collection
  .map(({ rank, ...item }) => item)

console.log(updated)

fs.writeFileSync(`./${FILE_NAME}-update.json`, JSON.stringify(updated))
