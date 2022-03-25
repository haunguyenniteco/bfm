const is =
  propName =>
  (strings, ...expressions) =>
  props => {
    if (!props[propName]) {
      return ''
    }
    return strings
      .map((string, index) => {
        if (expressions[index]) {
          const expression = expressions[index]
          if (typeof expression === 'function') {
            return string.concat(expression(props))
          }
          return string.concat(expression)
        }
        return string
      })
      .join('')
  }
export default is

export const match = () => () => ''
