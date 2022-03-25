/* eslint-disable camelcase */
import format from 'date-fns/format'
import { money, isDelivery } from '@lib/helpers'

// TODO: Make this reusable and move to helper functions
const getMethodByServiceType = (methods, type) => methods.find(({ services }) => services[0].type === type)

export function createOnlineOrderPayload({
  items,
  customer,
  address,
  delivery,
  reservedSlot,
  notes,
  orchestration = {},
  placeId,
}) {
  const { id: customerId, firstName, lastName, email, phone, loyaltyCardId } = customer
  const { orchestrationId, partOrchestrationId, rawData: rawOrchestration } = orchestration
  // this is the only way to get 'homedelivery' type
  const deliveryType = delivery.type === 'pickup' ? 'pickup' : 'homedelivery'
  // find the correct object using the deliveryType
  const orchestrationDeliveryMethod = getMethodByServiceType(rawOrchestration?.parts?.[0].deliveryMethods, deliveryType)

  const customerAddress = {
    name: `${firstName} ${lastName}`,
    ...address.address,
  }
  return {
    customer_info: {
      ...(customerId && { customer_id: customerId }),
      ...(loyaltyCardId && { loyalty_card_id: loyaltyCardId }),
    },
    customer_address: {
      ...customerAddress,
      first_name: firstName,
      last_name: lastName,
      email,
      phone,
    },
    billing_address: {},
    payment_method: {
      ...rawOrchestration?.paymentMethods?.[0],
      configuration: {
        success_url: `${window.location.origin}/checkout/thank-you`,
        failure_url: `${window.location.origin}/checkout/payment/failed`,
        cancel_url: `${window.location.origin}/checkout/checkout-cancel`,
        project_code: 'WINDCAVE',
      },
    },
    orchestration_id: orchestrationId,
    place_id: placeId,
    editable: rawOrchestration?.editable,
    cancellable: rawOrchestration?.cancellable,
    parts: [
      {
        orchestration_id: partOrchestrationId,
        place_id: placeId,
        delivery_method: {
          provider_id: orchestrationDeliveryMethod.providerId,
          type: orchestrationDeliveryMethod.type,
          service: {
            id: orchestrationDeliveryMethod.services?.[0].id,
            code: orchestrationDeliveryMethod.services?.[0].code,
            type: orchestrationDeliveryMethod.services?.[0].type,
            price: orchestrationDeliveryMethod.services?.[0].price,
            delivery_slot: {
              id: parseInt(delivery.slot.id, 10),
              start_time: delivery.slot.startsAt,
              end_time: delivery.slot.endsAt,
              delivery_date: format(new Date(delivery.slot.date), 'yyyy-MM-dd'),
              reservation_token: reservedSlot?.token,
            },
            address: {
              ...customerAddress,
              first_name: firstName,
              last_name: lastName,
              email,
              phone,
            },
          },
          ...(notes && {
            notes: [
              {
                type: isDelivery(delivery.type) ? 'driver' : 'picker',
                message: notes,
              },
            ],
          }),
        },
        // packaging_option: {},
        products: rawOrchestration.parts?.[0].products.map(product => {
          const { sku, quantity, unitPrice, rowPrice } = product
          // we need to get some of the info from basket item
          const foundItem = items.find(item => item.gtin === sku) || {}
          const allowReplace = foundItem.allowReplace || false
          const note = foundItem.note || ''
          const externalData = foundItem?.externalData || ''

          return {
            sku,
            allow_replace: allowReplace,
            notes: [note],
            quantity,
            unit_price: {
              price: money(unitPrice.price),
              price_vat: money(unitPrice.priceVat),
            },
            row_price: {
              price: money(rowPrice.price),
              price_vat: money(rowPrice.priceVat),
            },
            external_data: externalData,
          }
        }),
      },
    ],
  }
}
