import * as types from '../mutation-types'

export const majorMutations = {
  // Major mutations
  [types.ALL_CLIENTS_SUCCESS] (state, payload) {
    state.isLoading = false
    state.clients = payload
  },
  [types.SINGLE_CLIENT_SUCCESS] (state, payload) {
    state.isLoading = false
    state.single_client = payload
  },
  [types.ALL_LOANS_SUCCESS] (state, payload) {
    state.isLoading = false
    state.loans = payload
  },
  [types.SINGLE_LOAN_SUCCESS] (state, payload) {
    state.isLoading = false
    state.single_loan = payload
  },
  [types.LOAN_SCHEDULE_SUCCESS] (state, payload) {
    state.isLoading = false
    state.loan_schedule = payload
  },
}
