import * as types from '../mutation-types'

export const commonMutations = {
  [types.START_LOADING] (state) {
    state.isLoading = true
    state.errorMessage = ''
    state.successMessage = ''
  },
  [types.STOP_LOADING] (state) {
    state.isLoading = false
  },
  [types.SUCCESS_MESSAGE] (state, message) {
    state.successMessage = message
    state.isLoading = false
  },
  [types.ERROR_MESSAGE] (state, message) {
    state.errorMessage = message
    state.isLoading = false
  },
  [types.CONNECTION_ERROR_MESSAGE] (state) {
    state.errorMessage = 'Network error!'
    state.isLoading = false
  },
  [types.HIDE_SHOW_MENUS] (state, payload) {
    state.menu_display = payload
    state.isLoading = false
  }
}
