import { RESTDataSource } from 'apollo-datasource-rest'
import keysToCamel from '../common/keysToCamel'

export class CommerceAPI extends RESTDataSource {
  constructor(config) {
    super()
    this.baseURL = config.baseApiUrl
    this.config = config
  }

  async willSendRequest(request) {
    request.headers.set('DG-Api-Key', this.config.apiKey)
    request.headers.set('DG-Organization-Id', this.config.organizationId)
  }

  // eslint-disable-next-line class-methods-use-this
  async parseBody(response) {
    const contentType = response.headers.get('Content-Type')
    const contentLength = response.headers.get('Content-Length')
    const hasContentLengthOrSkip = contentLength ? contentLength > 0 : true
    if (response.status !== 204 && contentType && hasContentLengthOrSkip && contentType.includes('json')) {
      const resObj = await response.json()
      return keysToCamel(resObj)
    }
    return response.text()
  }

  async head(path, body, init) {
    return this.fetch({ method: 'HEAD', path, body, ...init })
  }

  async getDefaults() {
    const { data } = await this.get('/').catch(err => {
      throw new Error('Failed to fetch defaults.', err)
    })
    return data
  }

  async signinGuest(params) {
    const { data } = await this.post('/customers/guest-sign-in', params)
    return data
  }

  async getCategories(params) {
    const { data = [] } = await this.get('/search/categories', params)
    return data
  }

  async getProducts(params) {
    const data = await this.post('/search/products', { ...params })
    return data
  }

  async getProductByPlaceId(storeId, productId) {
    const { data } = await this.get(`/places/${storeId}/products/${productId}`)
    return data
  }

  async getPredictions(params) {
    const { data } = await this.get('/search/predictions', params)
    return data
  }

  async getSimilarProducts(params) {
    const data = await this.get('/search/products/similar', params)
    return data
  }

  async getPlaceById(id) {
    const { data } = await this.get(`/places/${id}`)
    return data
  }

  async getPlacesForPickup(params) {
    const { data } = await this.get('/dts/places/for/pickup', params)
    return data
  }

  async getPlacesForDeliveries(params) {
    const { data } = await this.get('/dts/places/for/deliveries', params)
    return data
  }

  async getDeliveryAreaGroups(placeId, params) {
    const { data } = await this.get(`/dts/places/${placeId}/delivery-area-groups`, params)
    return data
  }

  async getPickupSlots(placeId, locationId, params) {
    const { data } = await this.get(`/dts/places/${placeId}/pickup-locations/${locationId}/pickup-slots`, params)
    return data
  }

  async getDeliverySlots(placeId, deliveryAreaGroupId, params) {
    const { data } = await this.get(
      `/dts/places/${placeId}/delivery-area-groups/${deliveryAreaGroupId}/delivery-slots`,
      params,
    )
    return data
  }

  async createShoppingList(customerId, payload) {
    const { data } = await this.post(`/customers/${customerId}/shopping-lists`, payload).catch(err => {
      throw new Error('Failed to create shopping list.', err)
    })
    return data
  }

  async patchShoppingList(customerId, shoppingListId, payload) {
    const { data } = await this.patch(`/customers/${customerId}/shopping-lists/${shoppingListId}`, payload).catch(
      err => {
        throw new Error('Failed to update shopping list.', err)
      },
    )
    return data
  }

  async getShoppingLists(customerId) {
    const { data } = await this.get(`/customers/${customerId}/shopping-lists`).catch(err => {
      throw new Error('Failed to fetch shopping lists.', err)
    })
    return data
  }

  async getShoppingList(customerId, shoppingListId) {
    const { data } = await this.get(`/customers/${customerId}/shopping-lists/${shoppingListId}`).catch(err => {
      throw new Error('Failed to fetch shopping list.', err)
    })
    return data
  }

  async setShoppingListActive(customerId, shoppingListId) {
    const { data } = await this.put(`/customers/${customerId}/shopping-lists/${shoppingListId}/active`).catch(err => {
      throw new Error('Failed to set shopping list active.', err)
    })
    return data
  }

  async addToShoppingList(customerId, shoppingListId, payload) {
    const { data } = await this.post(`/customers/${customerId}/shopping-lists/${shoppingListId}/items`, payload).catch(
      err => {
        throw new Error('Failed to add item to shopping list.', err)
      },
    )
    return data
  }

  async removeFromShoppingList(customerId, shoppingListId, id) {
    const { data } = await this.delete(`/customers/${customerId}/shopping-lists/${shoppingListId}/items/${id}`).catch(
      err => {
        throw new Error('Failed to remove item from shopping list.', err)
      },
    )
    return data
  }

  async emptyShoppingList(customerId, shoppingListId) {
    const data = await this.delete(`/customers/${customerId}/shopping-lists/${shoppingListId}/items`).catch(err => {
      throw new Error('Failed to empty shopping list.', err)
    })
    return data
  }

  async deleteShoppingList(customerId, shoppingListId) {
    const data = await this.delete(`/customers/${customerId}/shopping-lists/${shoppingListId}`).catch(err => {
      throw new Error('Failed to delete shopping list.', err)
    })
    return data
  }

  async validateBasketItems(shoppingListId, placeId, payload) {
    const { data } = await this.put(`/shopping-lists/${shoppingListId}/places/${placeId}`, payload).catch(err => {
      throw new Error('Failed to validate shopping list.', err)
    })
    return data
  }

  async getCustomerOrder(id, orderId) {
    const { data } = await this.get(`/customers/${id}/orders/${orderId}`)
    return data
  }

  async getCustomerOrders(id, page = 1, pageSize = 10) {
    const params = {
      page,
      pageSize,
    }
    const data = await this.get(`/customers/${id}/orders`, params)
    return data
  }

  async createOrder(customerId, params) {
    const { data } = await this.post(`/customers/${customerId}/orders`, params)
    return data
  }

  async amendOrder(customerId, orderId, params) {
    const { data } = await this.patch(`/customers/${customerId}/orders/${orderId}`, params)
    return data
  }

  async cancelOrder(customerId, orderId) {
    const { data } = await this.patch(`/customers/${customerId}/orders/${orderId}/cancel`)
    return data
  }

  async finalizeOrder(orderId) {
    const data = await this.patch(`/orders/${orderId}/finalize`)
    return data
  }

  async orchestration(params) {
    const { data } = await this.post('/orders/orchestration', params)
    return data
  }

  async getOrchestration(id) {
    const { data } = await this.get(`/orders/orchestrations/${id}`)
    return data
  }

  async getContent(slug, format = 'html') {
    const data = await this.get(`/content/page`, { slug, format })
    return data
  }

  async getArea(key, format, preview) {
    const data = await this.get(`/content/area`, { key, format, preview })
    return data
  }

  async reserveDeliverySlot({ placeId, deliveryAreaGroupId, id, deliveryDate }) {
    const payload = { delivery_date: deliveryDate }
    const { data } = await this.post(
      `/dts/places/${placeId}/delivery-area-groups/${deliveryAreaGroupId}/delivery-slots/${id}/reservation`,
      payload,
    )
    return data
  }

  async refreshDeliverySlotReservation({ placeId, deliveryAreaGroupId, id, token }) {
    const { data } = await this.patch(
      `/dts/places/${placeId}/delivery-area-groups/${deliveryAreaGroupId}/delivery-slots/${id}/reservation/${token}`,
    )
    return data
  }

  async cancelDeliverySlotReservation({ placeId, deliveryAreaGroupId, id, token }) {
    await this.delete(
      `/dts/places/${placeId}/delivery-area-groups/${deliveryAreaGroupId}/delivery-slots/${id}/reservation/${token}`,
    )
  }

  async reservePickupSlot({ placeId, pickupLocationId, id, deliveryDate }) {
    const payload = { delivery_date: deliveryDate }
    const { data } = await this.post(
      `/dts/places/${placeId}/pickup-locations/${pickupLocationId}/pickup-slots/${id}/reservation`,
      payload,
    )
    return data
  }

  async refreshPickupSlotReservation({ placeId, pickupLocationId, id, token }) {
    const { data } = await this.patch(
      `/dts/places/${placeId}/pickup-locations/${pickupLocationId}/pickup-slots/${id}/reservation/${token}`,
    )
    return data
  }

  async cancelPickupSlotReservation({ placeId, pickupLocationId, id, token }) {
    await this.delete(
      `/dts/places/${placeId}/pickup-locations/${pickupLocationId}/pickup-slots/${id}/reservation/${token}`,
    )
  }
}
