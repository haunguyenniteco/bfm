import { memo, useEffect, useMemo, useRef, useState } from 'react'
import { toast } from 'react-toastify'
import useAppState from '@hooks/useAppState'
import { useBasket } from '@components/basket/BasketItem/context'
import { FormattedMessage } from 'react-intl'
import PropTypes from 'prop-types'
import Measure from 'react-measure'
import Button from '@components/ui/Button'
import RemoveIcon from '@mui/icons-material/Remove'
import { getDisabledBuffer } from '@components/basket/BasketItem/helpers'
import cx from 'classnames'
import messages from './messages'
import { ItemsText, InBasketText, CartBox, Plus, CartInfo } from './elements'

const CartActionBox = ({ product, isSmall, isResponsive, width, maxWidth }) => {
  const { gtin: basketItemId } = product

  const timeoutRef = useRef(null)
  const { intl } = useAppState()
  const {
    actions: { findItemByBasketItemId, addItem, changeItemQuantity },
  } = useBasket()
  const inBasket = findItemByBasketItemId(basketItemId)
  const basketQuantity = inBasket?.quantity || 0
  const [quantity, setQuantity] = useState(basketQuantity)
  const hasBasketInfo = !!quantity

  const cartBoxHeight = useRef(null)

  const disabledBuffer = getDisabledBuffer(product.inventory, inBasket)

  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    if (basketQuantity !== quantity) {
      // debounce timeout
      timeoutRef.current = setTimeout(() => {
        if (quantity > basketQuantity) {
          // there is a need of addItem usage because it handles case where basket need to set new product
          addItem(product, quantity - basketQuantity)
        } else {
          changeItemQuantity({
            item: product,
            quantity,
          })
        }
      }, 1000)
    }
  }, [quantity, product, basketQuantity, addItem, changeItemQuantity])

  const handleDecrement = e => {
    e.stopPropagation()
    setQuantity(prev => prev - 1)
  }
  const handleIncrement = e => {
    e.stopPropagation()
    if (disabledBuffer) {
      toast(intl.formatMessage(messages.notAvailable))
      return
    }
    setQuantity(prev => prev + 1)
  }

  const memoizedCartBox = useMemo(
    () => (
      <Measure
        bounds
        onResize={contentRect => {
          cartBoxHeight.current = contentRect.bounds.height
        }}
      >
        {({ measureRef }) => (
          <CartBox
            ref={measureRef}
            hasbasketinfo={hasBasketInfo.toString()}
            width={width}
            maxwidth={maxWidth}
            height={cartBoxHeight.current}
          >
            {hasBasketInfo && (
              <Button
                sx={{ borderRadius: '50%' }}
                variant="cart"
                color="decrement"
                size="small"
                title={intl.formatMessage(messages.decrement)}
                aria-label={intl.formatMessage(messages.decrement)}
                onClick={handleDecrement}
              >
                <RemoveIcon />
              </Button>
            )}
            <CartInfo>
              {hasBasketInfo && (
                <>
                  <ItemsText>{quantity}</ItemsText>
                  <InBasketText className={cx({ small: isSmall })}>
                    <FormattedMessage {...messages.inBasket} />
                  </InBasketText>
                </>
              )}
            </CartInfo>
            <Button
              sx={{ borderRadius: '50%' }}
              variant="cart"
              color={disabledBuffer ? 'decrement' : undefined}
              size="small"
              title={intl.formatMessage(messages.increment)}
              aria-label={intl.formatMessage(messages.increment)}
              onClick={handleIncrement}
            >
              <Plus />
            </Button>
          </CartBox>
        )}
      </Measure>
    ),
    [quantity],
  )

  return <>{memoizedCartBox}</>
}

CartActionBox.defaultProps = {
  isResponsive: true,
}

CartActionBox.propTypes = {
  product: PropTypes.shape({
    name: PropTypes.object,
    id: PropTypes.string,
    prices: PropTypes.shape({ clicksUnitPrice: PropTypes.number.isRequired }),
    gtin: PropTypes.string.isRequired,
  }),
  isResponsive: PropTypes.bool,
  isSmall: PropTypes.bool,
}

export default memo(CartActionBox)
