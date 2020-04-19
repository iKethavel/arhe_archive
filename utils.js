const R = require('ramda')

const toCapital = R.pipe(
  R.split(' '),
  R.map(title => title.charAt(0).toUpperCase() + title.slice(1).toLowerCase()),
  R.join(' ')
)

const toSnakeCase = string => 
  string.replace(/\W+/g, " ")
    .split(/ |\B(?=[A-Z])/)
    .map(word => word.toLowerCase())
    .join('_')


module.exports = {
  toCapital,
  toSnakeCase
}
