import { useMutation } from '@apollo/client'

export const mutationFactory = mutation => () => {
  const [mutationInstance] = useMutation(mutation)

  const mutationFunction = async (variables, options) => {
    const result = await mutationInstance({ variables, ...options })
    return result
  }

  return mutationFunction
}
