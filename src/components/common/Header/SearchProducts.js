import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Box from '@mui/material/Box'
import Autocomplete from '@mui/material/Autocomplete'
import SearchIcon from '@mui/icons-material/Search'
import Search from '@components/ui/Search'
import { Query } from '@graphql-sdk'
import useAppState from '@hooks/useAppState'
import InputAdornment from '@mui/material/InputAdornment'
import { Typography } from '@components/ui'
import { CurrencyPrice } from '@components/common/index'
import { useApolloClient } from '@apollo/client'
import { routeCategorySelect, routeProductSearch, routeProductSelect } from '@lib/helpers'
import useChangeLanguage from '@hooks/useChangeLanguage'
import Image from '@components/product/Image/index'
import IconButton from '@mui/material/IconButton'
import Hidden from '@mui/material/Hidden'

const SearchProducts = () => {
  const router = useRouter()
  const [query, setQuery] = useState(router.query.q || '')
  const [options, setOptions] = useState([])
  const client = useApolloClient()
  const { locale } = useChangeLanguage()
  const { storeId } = useAppState()

  const getPredictions = term =>
    client.query({
      query: Query.getSearchPredictions,
      variables: {
        input: {
          store_id: storeId,
          lang: locale,
          tree: 'online',
          term,
        },
      },
    })

  const getTextSuggestion = (text = '') => {
    const regex = new RegExp(query, 'i')
    if (text.search(regex) !== -1) {
      return text.replace(regex, '<b>$&</b>')
    }

    return text
  }

  useEffect(() => {
    const fetchOptions = async () => {
      if (!query || query.length < 3) {
        return options.length && setOptions([])
      }
      const { data } = await getPredictions(query)
      setOptions(data.predictions)
    }
    fetchOptions()
  }, [query])

  return (
    <Box flexGrow="1">
      <Autocomplete
        freeSolo
        fullWidth
        role="search"
        options={options}
        getOptionLabel={option => option.searchPhrase || option.name?.en || option}
        filterOptions={x => x}
        inputValue={query}
        renderOption={(p, option) => (
          <Box
            display="flex"
            flexDirection="row"
            width={1}
            borderTop={p['data-option-index'] !== 0 ? '1px solid #bbbbbb' : 'unset'}
            {...p}
          >
            <Box minWidth={24} mr={1.5}>
              {option.type === 'PRODUCT' && (
                <Image
                  className="product-image"
                  media={[option.image]}
                  alt={option.searchPhrase || option.name.en}
                  width={24}
                  height={24}
                />
              )}
            </Box>
            <Hidden mdDown>
              <Box maxWidth={290} flexGrow={1}>
                <Typography
                  noWrap
                  dangerouslySetInnerHTML={{
                    __html: getTextSuggestion(option.searchPhrase || option.name?.en || option),
                  }}
                />
              </Box>
            </Hidden>
            <Hidden mdUp>
              <Box maxWidth={260} flexGrow={1}>
                <Typography
                  noWrap
                  dangerouslySetInnerHTML={{
                    __html: getTextSuggestion(option.searchPhrase || option.name?.en || option),
                  }}
                />
              </Box>
            </Hidden>
            {option.type === 'PRODUCT' && (
              <Box fontWeight="bold" style={{ marginLeft: 'auto', order: 2 }}>
                <CurrencyPrice value={option.price.clicksUnitPrice} />
              </Box>
            )}
          </Box>
        )}
        renderInput={({ InputProps, ...params }) => (
          <Search
            InputProps={{
              ...InputProps,
              startAdornment: (
                <InputAdornment position="start">
                  <IconButton
                    size="small"
                    onClick={() => {
                      // on icon click redirect user to search results
                      routeProductSearch(query)
                    }}
                  >
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            {...params}
            size="small"
          />
        )}
        onInputChange={(e, value) => setQuery(value)}
        onChange={(e, selected) => {
          if (!selected) {
            return
          }
          // custom string search on enter
          if (typeof selected === 'string') {
            routeProductSearch(selected)
          }
          if (selected.type === 'CATEGORY') {
            routeCategorySelect(selected, locale)
          } else if (selected.type === 'PRODUCT') {
            routeProductSelect(selected, locale)
          } else if (selected.type === 'PHRASE') {
            routeProductSearch(selected.searchPhrase)
          }
        }}
      />
    </Box>
  )
}

SearchProducts.propTypes = {}

export default SearchProducts
