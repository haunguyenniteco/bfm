import { useState } from 'react'
import { FormattedMessage } from 'react-intl'
import { useRouter } from 'next/router'
import redirect from '@lib/redirect'
import Box from '@mui/material/Box'
import { toast } from 'react-toastify'
import { useOrchestration } from '@graphql-sdk'
import useAppState from '@hooks/useAppState'
import useChangeLanguage from '@hooks/useChangeLanguage'
import useToggle from '@hooks/useToggle'
import handleFormErrors from '@lib/handleFormErrors'
import { AuthLayout, CheckoutContainer } from '@components/common'
import { useBasket } from '@components/basket/BasketItem/context'
import Typography from '@components/ui/Typography'
import Button from '@components/ui/Button'
import Sticky from 'react-sticky-el'
import NoteModal from './NoteModal'
import Summary from '../Summary/index'
import BasketSkeletonloader from '../BasketSkeletonloader'
import messages from '../messages'
import BasketProductList from '../BasketProductList'
import { BasketDeliveryAndSlotSelector } from '../DeliveryAndSlot'

function BasketItem() {
  const orchestrate = useOrchestration()
  const [orchestrating, setOrchestrating] = useState(false)
  const [errors, setErrors] = useState(false)

  const router = useRouter()
  const { locale } = useChangeLanguage()
  const { intl } = useAppState()
  const {
    state: {
      items,
      ready,
      amendmentId,
      shipping: { delivery, address },
    },
    actions: { setOrchestration, setItemNote, removeItemNote, removeItem },
  } = useBasket()

  const [noteItem, setNoteItem] = useState(null)
  const [modalVisible, toggleModal] = useToggle(false)

  const showNoteModal = item => {
    setNoteItem(item)
    toggleModal()
    document.activeElement.blur()
  }

  const handleSaveNote = (item, allowReplace, note) => {
    setItemNote(item, allowReplace, note)
    toggleModal()
  }

  const handleRemoveNote = item => {
    try {
      removeItemNote(item)
      document.activeElement.blur()
      toast(<FormattedMessage {...messages.successMessage} />)
    } catch (error) {
      toast.error(<FormattedMessage {...messages.errorMessage} />)
      console.log(error)
    }
  }

  const handleRemoveItem = item => {
    try {
      removeItem(item)
      document.activeElement.blur()
      toast(<FormattedMessage {...messages.successMessage} />)
    } catch (error) {
      toast.error(<FormattedMessage {...messages.errorMessage} />)
      console.log(error)
    }
  }

  const handleCheckout = async () => {
    setOrchestrating(true)
    try {
      if (address && delivery) {
        const input = {
          products: items.map(({ masterProductId, sku, quantity }) => ({
            master_product_id: masterProductId,
            sku,
            quantity,
          })),
          customer: {
            is_loyalty: false,
            latitude: address.lat,
            longitude: address.lon,
            corporate_shopper: false,
          },
          place: {
            id: delivery?.store?.placeId,
          },
          past_slots: false,
        }
        const {
          data: { orchestration: orchestrated },
        } = await orchestrate({ input })

        setOrchestration(orchestrated)
        router.replace('/checkout')
      } else {
        const redirectUrl = !address ? '/get-address?redirectUrl=/basket' : '/select-store?redirectUrl=/basket'
        router.replace(redirectUrl)
      }
    } catch ({ graphQLErrors }) {
      handleFormErrors(graphQLErrors, setErrors)
    }
    setOrchestrating(false)
  }

  if (!ready) {
    return <BasketSkeletonloader />
  }
  if (amendmentId) {
    redirect(`orders/${amendmentId}#confirm-changes`, amendmentId)
  }

  return (
    <AuthLayout seoTitle={intl.formatMessage(messages.pageTitle)} bg="G3">
      <NoteModal item={noteItem} show={modalVisible} locale={locale} onSave={handleSaveNote} />
      <CheckoutContainer
        headerComponent={
          <>
            <BasketDeliveryAndSlotSelector delivery={delivery} address={address} urlPath="basket" editableMode />
            <Summary />
          </>
        }
        childrenStyles={{
          backgroundColor: '#f6f6f6',
        }}
        footerComponent={
          <>
            {Object.keys(items).length > 0 && (
              <Sticky mode="bottom" dontUpdateHolderHeightWhenSticky>
                <Box sx={{ backgroundColor: '#ffffff', pb: 1 }}>
                  <Button fullWidth onClick={handleCheckout} disabled={orchestrating}>
                    <FormattedMessage {...messages.checkout} />
                  </Button>
                </Box>
              </Sticky>
            )}
          </>
        }
        footerStyles={{
          backgroundColor: '#f6f6f6',
        }}
      >
        <BasketProductList
          items={items}
          showNoteModal={showNoteModal}
          locale={locale}
          handleRemoveNote={handleRemoveNote}
          handleRemoveItem={handleRemoveItem}
        />
        {errors && errors.apiError && (
          <Box mt={2}>
            <Typography color="error">{errors.apiError.message}</Typography>
          </Box>
        )}
      </CheckoutContainer>
    </AuthLayout>
  )
}

export default BasketItem
