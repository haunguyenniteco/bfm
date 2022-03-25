import useSWR from 'swr'

const useServiceSelection = () =>
  useSWR('serviceSelectionState', {
    initialData: {
      addressData: null,
      selectedService: null,
    },
  })

export default useServiceSelection
