import useAppState from '@hooks/useAppState'
import { getDefaultImageUrl } from '@lib/mediaTransform'
import { CartBox, CurrencyPrice, NoteActions } from '@components/common'
import Card from '@mui/material/Card'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import Avatar from '@mui/material/Avatar'
import CardHeader from '@mui/material/CardHeader'
import IconButton from '@mui/material/IconButton'
import CardActions from '@mui/material/CardActions'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Substitution from '@components/basket/BasketItem/Substitution'
import { Products, CartBoxWrapper, CartActions, Prices, ProductTotal, ProductPriceDetail } from '../elements'
import messages from '../messages'

const BasketProductList = ({
  locale,
  items,
  showNoteModal,
  showNoteOption = true,
  handleRemoveNote,
  productPath = '/products',
  handleRemoveItem,
}) => {
  const { intl } = useAppState()

  return (
    <Products>
      <Box>
        <Typography fontSize={16} fontWeight="600">
          {intl.formatMessage(messages.products)}
        </Typography>
      </Box>

      {items.map(item => (
        <Card sx={{ my: 1, boxShadow: 'none' }} key={item.id}>
          <CardHeader
            // disableTypography
            avatar={<Avatar aria-label={item.name.en} alt={item.name.en} src={getDefaultImageUrl(item.media)} />}
            action={
              <IconButton
                aria-label={intl.formatMessage(messages.deleteItem)}
                title={intl.formatMessage(messages.deleteItem)}
                onClick={() => handleRemoveItem(item)}
                data-cy="remove-basket-item"
              >
                <DeleteForeverIcon />
              </IconButton>
            }
            title={item.name[locale]}
            titleTypographyProps={{
              variant: 'h5',
              fontWeight: 'bold',
              lineHeight: '1.43',
            }}
          />
          <CartActions sx={{ marginLeft: '56px' }}>
            {!!item.externalData.oldPrice && (
              <Prices>
                <ProductTotal>
                  <Box display="flex" alignItems="flex-end">
                    <Box color="error" fontSize="16px" fontWeight="bold" mr="8px">
                      <CurrencyPrice value={item.quantity * item.externalData.price} />
                    </Box>
                    <Box fontSize="14px" fontWeight="bold" sx={{ textDecoration: 'line-through' }}>
                      <CurrencyPrice value={item.quantity * item.externalData.oldPrice} />
                    </Box>
                  </Box>
                </ProductTotal>
                <ProductPriceDetail>
                  {item.quantity} x <CurrencyPrice value={item.promotions[0].clicksPromotionPrice} />
                </ProductPriceDetail>
              </Prices>
            )}
            {!item.externalData.oldPrice && (
              <Prices>
                <ProductTotal>
                  <Box fontSize="16px">
                    <CurrencyPrice value={item.quantity * item.externalData.price} />
                  </Box>
                </ProductTotal>
                <ProductPriceDetail>
                  {item.quantity} x <CurrencyPrice value={item.externalData.price} />
                </ProductPriceDetail>
              </Prices>
            )}
          </CartActions>
          <CardActions sx={{ justifyContent: 'space-between' }}>
            <Substitution item={item} />

            {showNoteOption && (
              <NoteActions
                item={item}
                showModal={() => showNoteModal(item)}
                removeNote={() => handleRemoveNote(item)}
              />
            )}

            <CartBoxWrapper>
              <CartBox product={item} />
            </CartBoxWrapper>
          </CardActions>
        </Card>
      ))}
    </Products>
  )
}

export default BasketProductList
