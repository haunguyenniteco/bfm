import { mutationFactory } from './mutationFactory'
import { Mutations } from '../mutations'

export const useClearBasket = mutationFactory(Mutations.clearBasket)
export const useValidateInventory = mutationFactory(Mutations.validateInventory)
export const useSigninCustomer = mutationFactory(Mutations.signinCustomer)
export const useSigninGuest = mutationFactory(Mutations.signinGuest)
export const useOrchestration = mutationFactory(Mutations.ORCHESTRATION)
export const useCreateOrder = mutationFactory(Mutations.CREATE_ORDER)
export const useAmendOrder = mutationFactory(Mutations.AMEND_ORDER)
export const useCancelOrder = mutationFactory(Mutations.CANCEL_ORDER)
export const useFinalizeOrder = mutationFactory(Mutations.FINALIZE_ORDER)
