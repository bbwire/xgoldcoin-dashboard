import router from '@/router'
import * as types from '../mutation-types'

export const staffMutations = {
  [types.ALL_USERS_SUCCESS] (state, payload) {
    state.isLoading = false
    state.users = payload
  },
  [types.SINGLE_USER_SUCCESS] (state, payload) {
    state.isLoading = false
    state.single_user = payload
  },
  [types.CURRENT_USER_SUCCESS] (state, payload) {
    state.isLoading = false
    state.user = payload
  },
  // New user
  [types.ADD_USER_SUCCESS] (state, message) {
    state.successMessage = message
    router.push('/users/')
    state.isLoading = false
  },
  [types.ACCOUNT_BALANCE_SUCCESS] (state, payload) {
    state.isLoading = false
    state.account_balance = payload
  }
}
