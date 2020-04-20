const fs = require('fs')
const utils = require('../utils')
// const collection = require('./madnesses.json')

const formatting = str => str.replace(/[\n\r]/g, '').replace(/\s\s+/g, ' ');

const collection = 
  formatting(fs.readFileSync('./injuries.json').toString())
    
const parsed = JSON.parse(collection).map(injury => (
  { 
    uid: injury.uid,
    title: utils.toCapital(injury.title.trim()),
    type: injury.type.trim(),
    description: injury.description
  })
)


fs.writeFileSync('./update.json', JSON.stringify(parsed))

// const collectionsToEdit = [
//   {
//     name: 'items',
//     collection: require('./items.json'),
//   },
//   {
//     name: 'martialTraits',
//     collection: require('./martial_traits.json'),
//   },
//   {
//     name: 'mysticalAbilities',
//     collection: require('./mystical_abilities.json'),
//   },
//   {
//     name: 'metamorphoses',
//     collection: require('./metamorphoses.json'),
//   },
//   {
//     name: 'martialArts',
//     collection: require('./martial_arts.json')
//   }
// ]
