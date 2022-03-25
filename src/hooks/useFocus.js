import { useState, useMemo } from 'react'

function useFocus() {
  const [isFocused, setFocused] = useState(false)

  const bind = useMemo(
    () => ({
      onFocus: () => setFocused(true),
      onBlur: () => setFocused(false),
    }),
    [],
  )

  return [isFocused, bind]
}

export default useFocus
