import { useState } from 'react'

const useHoverClick = () => {
  const [clicked, set] = useState(false)
  return {
    clicked,
    bind: {
      onClick: () => set(true),
      onMouseLeave: () => set(false),
    },
  }
}

export default useHoverClick
