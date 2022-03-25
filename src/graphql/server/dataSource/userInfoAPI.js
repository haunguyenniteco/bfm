import { RESTDataSource } from 'apollo-datasource-rest'
import keysToCamel from '../common/keysToCamel'

export class UserInfoAPI extends RESTDataSource {
  constructor(config) {
    super()
    this.baseURL = config.userInfoApiUrl
    this.config = config
  }

  async willSendRequest(request) {
    const { userScope } = this.context || {}
    const { accessToken = '' } = (await userScope) || {}
    if (userScope.username === 'shopper') {
      request.headers.set('Authorization', `Bearer ${accessToken}`)
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

  async getCustomer() {
    const data = await this.get(`/`)
    return data
  }
}
