import { RESTDataSource } from 'apollo-datasource-rest'
import keysToCamel from '../common/keysToCamel'

export class ShopperAPI extends RESTDataSource {
  constructor(config) {
    super()
    this.baseURL = config.baseApiUrl
    this.config = config
  }

  async willSendRequest(request) {
    const { userScope } = this.context || {}
    const { accessToken } = (await userScope) || {}
    request.headers.set('DG-Api-Key', this.config.apiKey)
    request.headers.set('DG-Organization-Id', this.config.organizationId)
    if (userScope.username === 'shopper') {
      request.headers.set('Authorization', accessToken)
    } else {
      request.headers.set('DG-Auth-Token', accessToken)
    }
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

  async getCustomer(customerId) {
    const { data } = await this.get(`/customers/${customerId}`)
    return data
  }

  async updateCustomer(id, params) {
    const { data } = await this.patch(`/customers/${id}`, params)
    return data
  }

  async getCustomerDeliveryAddresses(id) {
    const { data } = await this.get(`/customers/${id}/delivery-addresses`)
    return data
  }

  async saveCustomerDeliveryAddress(id, params) {
    const { data } = await this.post(`/customers/${id}/delivery-addresses`, params)
    return data
  }

  async deleteCustomerDeliveryAddress(id, addressId) {
    const data = await this.delete(`/customers/${id}/delivery-addresses/${addressId}`)
    return data
  }

  async changePassword(params) {
    const { data } = await this.put('/customers/password', params)
    return data
  }

  async getCustomerIdentity() {
    const { data } = await this.get('/customers/authorize')
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

  async orchestration(params) {
    const { data } = await this.post('/orders/orchestration', params)
    return data
  }

  async getOrchestration(id) {
    const { data } = await this.get(`/orders/orchestrations/${id}`)
    return data
  }
}
