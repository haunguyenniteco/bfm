const HandleFormErrors = (graphQLErrors, setErrors, messages = {}) => {
  if (graphQLErrors && graphQLErrors.length) {
    const [
      {
        extensions: { response = {} },
        message,
      },
    ] = graphQLErrors
    const { body: { error } = {}, status } = response
    // Handle Error code 422
    if (status && status === 422) {
      const { errors } = error
      const key = Object.keys(errors)[0]
      const fieldMessage = errors[key][0]
      let field = key
      if (key === 'username') {
        field = 'email'
      }

      if (messages[fieldMessage]) {
        setErrors({ [field]: messages[fieldMessage] })
      } else {
        setErrors({ [field]: `${field} ${fieldMessage}` })
      }
    } else if (error) {
      const { code = '', message: errorMessage = '' } = error
      setErrors({
        apiError: {
          code,
          message: messages[code] ? messages[code] : errorMessage,
        },
      })
    } else {
      setErrors({ apiError: { message } })
    }
  }
}

export default HandleFormErrors
