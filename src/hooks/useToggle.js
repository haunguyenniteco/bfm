import { useState, useCallback } from 'react'

const useToggle = state => {
  const [value, setValue] = useState(state)

  const toggle = useCallback(
    nextValue => {
      if (typeof nextValue !== 'undefined') {
        setValue(!!nextValue)
        return
      }

      setValue(valueToSet => !valueToSet)
    },
    [setValue],
  )

  return [value, toggle]
}

export default useToggle
