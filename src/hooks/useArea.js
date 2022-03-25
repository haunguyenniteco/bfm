import { useCmsArea } from '@graphql-sdk'

const useArea = (key, Element = 'div') => {
  const { loading, error, data: { area: { key: areaKey, content } = {} } = {} } = useCmsArea({ key })

  return {
    loading,
    error,
    key: areaKey,
    // eslint-disable-next-line react/no-danger
    [key]: content && <Element className={`area-${key}`} dangerouslySetInnerHTML={{ __html: content }} />,
  }
}

export default useArea
