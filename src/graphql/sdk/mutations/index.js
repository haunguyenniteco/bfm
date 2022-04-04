import { validateInventory, clearBasket } from './basket'
import { signinGuest, signinCustomer } from './user'
import { ORCHESTRATION, CREATE_ORDER, AMEND_ORDER, CANCEL_ORDER, FINALIZE_ORDER } from './order'

export const Mutations = {
  validateInventory,
  clearBasket,
  signinGuest,
  signinCustomer,
  ORCHESTRATION,
  CREATE_ORDER,
  AMEND_ORDER,
  CANCEL_ORDER,
  FINALIZE_ORDER,
}
