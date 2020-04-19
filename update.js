const R = require('ramda')
const fs = require('fs')


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
  }
]
