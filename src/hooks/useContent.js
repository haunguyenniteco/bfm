import useAppState from '@hooks/useAppState'
import { useCmsContent } from '@graphql-sdk'
import url from 'url-parse'
import parse from 'html-react-parser'
import ProductsCards from '@components/product/ProductsCards/index'

export const useContentByPath = pathname => {
  const {
    loading,
    error,
    data: { content: { title, description, content, image } = {} } = {},
    refetch,
    networkStatus,
  } = useCmsContent({ slug: pathname })

  const parsedContent = parse(content || '', {
    replace: domNode => {
      if (domNode.name === 'productlist' && domNode.attribs.gtins.replaceAll) {
        const gtins = domNode.attribs.gtins
          .replaceAll(/[“”]/gi, '')
          .split(',')
          .filter(number => number)
        return <ProductsCards gtin={gtins} />
      }
    },
  })
  return {
    loading,
    error,
    refetch,
    networkStatus,
    title,
    description,
    image,
    content: content && parsedContent,
  }
}

const useContent = () => {
  const { router } = useAppState()
  const { pathname } = url(router.asPath)

  return useContentByPath(pathname)
}

export default useContent
