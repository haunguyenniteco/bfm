import { getUserDetails, isSignedIn } from './user'
import {
  getStoreInfo,
  getPlacesForPickupAndDeliveries,
  getDeliverySlots,
  getPickupSlots,
  getDeliveryAreaGroups,
} from './place'
import { getSearchPredictions } from './predictions'
import { getCategoryDetails } from './category'
import { getProductListDetails, getProductDetails, getProductSimilarProducts } from './products'
import { intializeBasket } from './basket'
import { getOrchestration, getOrder, getOrderList } from './order'
import { getCmsContent, getCmsArea } from './cms'

export const Query = {
  getUserDetails,
  isSignedIn,
  getStoreInfo,
  getPlacesForPickupAndDeliveries,
  getDeliverySlots,
  getPickupSlots,
  getCategoryDetails,
  getSearchPredictions,
  getProductListDetails,
  getProductDetails,
  getProductSimilarProducts,
  intializeBasket,
  getOrchestration,
  getOrder,
  getOrderList,
  getDeliveryAreaGroups,
  getCmsContent,
  getCmsArea,
}
