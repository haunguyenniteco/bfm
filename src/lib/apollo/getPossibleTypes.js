/* eslint-disable no-underscore-dangle */
const fetch = require('isomorphic-unfetch')
const fs = require('fs')
const path = require('path')

const config = require('../../../config')

const ENDPOINT = config.SERVER_URL

fetch(ENDPOINT, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    query: `
    query getSchemaTypes {
      __schema {
        types {
          kind
          name
          possibleTypes {
            name
          }
        }
      }
    }
    `,
  }),
})
  .then(result => result.json())
  .then(result => {
    const possibleTypes = {}

    result.data.__schema.types.forEach(supertype => {
      if (supertype.possibleTypes) {
        possibleTypes[supertype.name] = supertype.possibleTypes.map(subtype => subtype.name)
      }
    })

    const filePath = path.join(__dirname, 'possibleTypes.json')
    fs.writeFileSync(filePath, JSON.stringify(possibleTypes), err => {
      if (err) {
        console.error('Error writing possibleTypes.json', err)
      } else {
        console.log('Fragment types successfully extracted!')
      }
    })
  })
