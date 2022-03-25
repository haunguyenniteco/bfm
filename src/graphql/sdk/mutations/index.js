import { validateInventory, clearBasket } from './basket'
import { signinGuest, signinCustomer, signupCustomer, signoutCustomer, forgotPassword, verifyCustomer } from './user'
import { ORCHESTRATION, CREATE_ORDER, AMEND_ORDER, CANCEL_ORDER, FINALIZE_ORDER } from './order'

export const Mutations = {
  validateInventory,
  clearBasket,
  signinGuest,
  signinCustomer,
  signupCustomer,
  signoutCustomer,
  forgotPassword,
  verifyCustomer,
  ORCHESTRATION,
  CREATE_ORDER,
  AMEND_ORDER,
  CANCEL_ORDER,
  FINALIZE_ORDER,
}
