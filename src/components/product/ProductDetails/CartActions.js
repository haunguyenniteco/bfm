import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import { toast } from 'react-toastify'
import { useBasket } from '@components/basket/BasketItem/context'
import { CartBox, CurrencyPrice } from '@components/common'
import Button from '@components/ui/Button/index'
import Box from '@mui/material/Box'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import useAppState from '@hooks/useAppState'
import { getDisabledBuffer } from '@components/basket/BasketItem/helpers'
import { getPriceForViews } from '@lib/helpers'
import Typography from '@components/ui/Typography/index'
import messages from './messages'
import { CartActionsWrapper, StickyContainer } from './elements'
import NetContent from './NetContent'

function CartActions({ product }) {
  const { gtin: basketItemId, netContent } = product
  const { intl } = useAppState()
  const {
    actions: { findItemByBasketItemId, addItem },
    state: { ready },
  } = useBasket()
  const itemInBasket = findItemByBasketItemId(basketItemId)
  const inBasket = !!itemInBasket
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.up('sm'))

  const disabledBuffer = getDisabledBuffer(product.inventory, itemInBasket)
  const { price, oldPrice, isPiecePricedByWeight } = getPriceForViews(product)

  const handleAddToBasket = (item, quantity = 1) => {
    if (disabledBuffer) {
      toast(intl.formatMessage(messages.notAvailable))
    } else {
      addItem(item, quantity)
    }
  }

  return (
    <StickyContainer>
      <CartActionsWrapper>
        {!matches && (
          <Box width="100%">
            <Typography
              variant="h1"
              component="span"
              fontWeight="600"
              fontSize="26px"
              fontFamily="OpenSans Bold"
              color="G1"
            >
              <CurrencyPrice value={price} about={isPiecePricedByWeight} />
              {isPiecePricedByWeight && (
                <Typography fontSize={10} fontWeight="500" component="span">
                  / each
                </Typography>
              )}
            </Typography>
            <NetContent netContent={netContent} />
          </Box>
        )}
        {inBasket ? (
          <CartBox product={product} isResponsive={false} width="100%" maxWidth="100%" />
        ) : (
          <Button
            color="cart"
            variant={disabledBuffer ? 'disabled' : undefined}
            disabled={!ready}
            style={{ minWidth: matches ? 222 : '50%' }}
            onClick={() => handleAddToBasket(product)}
          >
            {disabledBuffer ? (
              <FormattedMessage {...messages.outOfStock} />
            ) : (
              <FormattedMessage {...messages.addToCart} />
            )}
          </Button>
        )}
      </CartActionsWrapper>
    </StickyContainer>
  )
}

CartActions.propTypes = {
  product: PropTypes.shape({
    name: PropTypes.object,
    additionalTradeItemDescription: PropTypes.object,
    tradeItemDescription: PropTypes.object,
    id: PropTypes.string,
  }),
}

export default CartActions
