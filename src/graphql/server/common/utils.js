export const pick = (obj, keys) => keys.reduce((acc, key) => (key in obj ? { ...acc, [key]: obj[key] } : acc), {})

export const omitBy = (obj, func) =>
  pick(
    obj,
    Object.keys(obj).filter(value => !func(value)),
  )

export const omit = (obj, keys) => omitBy(obj, value => keys.includes(value))
