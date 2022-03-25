import { ApolloError } from 'apollo-server-micro'
import format from 'date-fns/format'

export const authenticated = next => async (root, args, context, info) => {
  const { customerId, username } = await context.userScope // catching the reject from the userScope promise.
  if ((customerId && username === 'guest') || !customerId) {
    throw new ApolloError('Unauthenticated', 'CUSTOMER_UNAUTHENTICATED')
  }

  return next(root, args, context, info)
}

// use the same convention on client-side. import from here
export const getFormattedAddress = address => {
  const { street, city, state, formattedAddress } = address
  return formattedAddress || `${street}, ${city}, ${state}`
}

export const getDriverNote = notes => {
  const driverNote = notes.find(note => note.type === 'driver')
  return driverNote ? driverNote.message : ''
}

export const money = value => parseFloat(parseFloat(value).toFixed(2))

export function handleErrors(err) {
  throw new Error(err.message)
}

export function flattenDetails(arr) {
  // Lift all the properties in 'details' to ProductHitResults object:
  return arr.map(({ details, ...rest }) => ({ ...details, ...rest }))
}

export const parseTime = time => {
  const timeFormat = 'HH:mm'
  const formattedTime = format(new Date(time), timeFormat)
  return formattedTime
}
