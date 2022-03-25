import { money } from '@lib/helpers'
import format from 'date-fns/format'

export function amendOnlineOrderPayload({
  items,
  order,
  storeInfo,
  delivery,
  address,
  reservedSlot,
  phone,
  email,
  notes,
}) {
  const orderDeliverySlot = delivery?.slot
    ? {
        id: parseInt(delivery.slot.id, 10),
        start_time: delivery.slot.startsAt,
        end_time: delivery.slot.endsAt,
        delivery_date: format(new Date(delivery.slot.date), 'yyyy-MM-dd'),
        reservation_token: reservedSlot.token,
      }
    : {
        id: order.deliverySlot.id,
        start_time: order.deliverySlot.startTime,
        end_time: order.deliverySlot.endTime,
        delivery_date: order.deliverySlot.deliveryDate,
        reservation_token: order.deliverySlot.deliveryToken ?? '',
      }

  const orderAddress = address
    ? { ...address.address, email, phone }
    : {
        email,
        phone,
        name: storeInfo.name,
        street: storeInfo.street,
        building: storeInfo.building,
        apartment: storeInfo.apartment,
        postcode: storeInfo.postcode,
        postal_area: storeInfo.postalArea,
        city: storeInfo.city,
        state: storeInfo.state,
        country_code: storeInfo.countryCode,
      }

  const orderProducts = items.map(product => {
    const { gtin, quantity, unit_price, promotions, allowReplace = false, note = '', externalData } = product // eslint-disable-line camelcase
    const unitPrice = promotions?.[0]?.clicksPromotionPrice || unit_price // eslint-disable-line camelcase

    return {
      sku: gtin,
      allow_replace: allowReplace,
      notes: [note],
      quantity,
      unit_price: {
        price: money(unitPrice),
        price_vat: money(unitPrice),
      },
      row_price: {
        price: money(unitPrice * quantity),
        price_vat: money(unitPrice * quantity),
      },
      external_data: externalData,
    }
  })

  return {
    parts: {
      id: order.partId,
      delivery_method: {
        service: {
          delivery_slot: orderDeliverySlot,
          address: orderAddress,
        },
        notes: {
          type: 'driver',
          message: notes || ' ',
        },
      },
      products: orderProducts,
    },
  }
}

export const orderProductsPayload = ({ order }) => {
  const productItems = order?.products
    .filter(orderProduct => {
      if (orderProduct.product.inventory?.balance === 0) {
        return false
      }
      return true
    })
    .map(orderProduct => {
      const {
        sku,
        quantity,
        allowReplace,
        price,
        product: {
          id,
          gtin,
          extId,
          name,
          media,
          masterProductId,
          categories,
          prices: { bricksUnitPrice, clicksUnitPrice },
        },
        externalData,
      } = orderProduct

      return {
        unit_price: price,
        bricksUnitPrice,
        clicksUnitPrice,
        basketItemId: gtin,
        id,
        sku,
        gtin,
        extId,
        masterProductId,
        quantity,
        note: '',
        allowReplace,
        name,
        media,
        categories,
        promotions: [],
        totalBricksPrice: null,
        totalClicksPrice: null,
        externalData,
      }
    })

  return productItems
}

export const orderStatusNotEditable = ['delivered', 'delivering', 'collected', 'collecting', 'cancelled']

export const canReOrder = ['delivered', 'collected']
