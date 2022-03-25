import { getDriverNote, getFormattedAddress, authenticated } from '../common/helpers'

// TODO: Wrap resolver with "authenticated" after shopper authentication in implemented //

const orderResolver = {
  Query: {
    order: async (_source, { orderId }, { dataSources, userScope }) => {
      try {
        const { customerId } = userScope
        const data = await dataSources.shopperAPI.getCustomerOrder(customerId, orderId)
        return {
          id: data.id,
          visibleId: data.visibleId,
          partId: data.parts[0].id,
          placeId: data.placeId,
          status: data.parts[0].status,
          createdAt: data.createdAt,
          address: getFormattedAddress(data.parts?.[0].deliveryMethod?.service?.address),
          name: data.parts?.[0].deliveryMethod?.service?.address?.name,
          email: data.parts?.[0].deliveryMethod?.service?.address?.email,
          phone: data.parts?.[0].deliveryMethod?.service?.address?.phone,
          notes: getDriverNote(data.parts?.[0].deliveryMethod?.notes),
          total: data.parts?.[0].price?.totalPriceVat,
          deliveryCharge: data.parts?.[0].deliveryMethod?.service?.deliverySlot?.deliveryPrice,
          deliverySlot: data.parts?.[0].deliveryMethod?.service?.deliverySlot,
          deliveryAddress: data.parts?.[0].deliveryMethod?.service?.address,
          products: data.parts?.[0].products.map(
            ({ sku, allowReplace, notes, quantity, unitPrice: { priceVat: price } = {}, externalData }) => ({
              id: sku,
              sku,
              quantity,
              price,
              placeId: data.placeId,
              allowReplace,
              notes,
              externalData,
            }),
          ),
          deliveryType: data.parts?.[0].deliveryMethod?.service?.code,
        }
      } catch (error) {
        return error
      }
    },
    orders: authenticated(async (_source, { page, pageSize }, { dataSources, userScope }) => {
      try {
        const { customerId } = userScope
        const {
          data,
          meta: { pagination },
        } = await dataSources.shopperAPI.getCustomerOrders(customerId, page, pageSize)
        return {
          items: data.map(
            ({
              id,
              placeId,
              visibleId,
              createdAt,
              parts: [
                {
                  id: partId,
                  status,
                  price: { totalPriceVat },
                  products,
                  deliveryMethod: {
                    notes,
                    service: {
                      code,
                      address, //  price: { max: deliveryCharge },
                      address: { name, email, phone },
                      deliverySlot,
                      deliveryAddress,
                    },
                  },
                },
              ],
            }) => ({
              id,
              visibleId,
              partId,
              createdAt,
              address: getFormattedAddress(address),
              name,
              email,
              phone,
              notes,
              deliverySlot,
              deliveryAddress,
              deliveryType: code,
              total: totalPriceVat,
              // deliveryCharge,
              status,
              products: products.map(({ sku, quantity, unitPrice: { priceVat: price } = {} }) => ({
                id: sku,
                quantity,
                price,
                placeId,
              })),
            }),
          ),
          pagination,
        }
      } catch (error) {
        return error
      }
    }),
    getOrchestration: async (_source, { id }, { dataSources }) => {
      try {
        const identity = await dataSources.shopperAPI.getOrchestration(id)
        return identity
      } catch (error) {
        return error
      }
    },
  },

  OrderProduct: {
    product: async (parent, _args, { dataSources }) => {
      try {
        const { id, placeId } = parent
        const {
          data: {
            products: [item],
          },
        } = await dataSources.commerceAPI.getProducts({
          store_id: placeId,
          gtin: [id],
        })
        const { details, ...product } = item

        return {
          ...details,
          ...product,
        }
      } catch (error) {
        return error
      }
    },
  },

  Mutation: {
    createOrder: async (_source, { input }, { userScope, dataSources }) => {
      try {
        const { customerId } = userScope
        const order = await dataSources.shopperAPI.createOrder(customerId, input)
        return order
      } catch (error) {
        return error
      }
    },

    amendOrder: async (_source, { orderId, input }, { userScope, dataSources }) => {
      try {
        const { customerId } = userScope
        const order = await dataSources.shopperAPI.amendOrder(customerId, orderId, input)
        return order
      } catch (error) {
        return error
      }
    },

    cancelOrder: async (_source, { orderId }, { dataSources, userScope }) => {
      try {
        const { customerId } = userScope
        await dataSources.shopperAPI.cancelOrder(customerId, orderId)
        return true
      } catch (error) {
        return error
      }
    },

    finalizeOrder: async (_source, { orderId }, { dataSources }) => {
      try {
        await dataSources.commerceAPI.finalizeOrder(orderId)
        return true
      } catch (error) {
        return error
      }
    },

    orchestration: async (_source, { input }, { dataSources }) => {
      try {
        const response = await dataSources.shopperAPI.orchestration(input)
        return response
      } catch (error) {
        return error
      }
    },
  },
}

export default orderResolver
