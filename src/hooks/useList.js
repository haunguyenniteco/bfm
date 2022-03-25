import { useState } from 'react'

const useList = (initialList = []) => {
  const [list, set] = useState(initialList)

  return [
    list,
    {
      set,
      clear: () => set([]),
      updateAt: (index, entry) => set(currentList => [...currentList.slice(0, index), entry, ...list.slice(index + 1)]),
      remove: index => set(currentList => [...currentList.slice(0, index), ...list.slice(index + 1)]),
      push: entry => set(currentList => [...currentList, entry]),
      filter: fn => set(currentList => currentList.filter(fn)),
      sort: fn => set(currentList => [...currentList].sort(fn)),
    },
  ]
}

export default useList
