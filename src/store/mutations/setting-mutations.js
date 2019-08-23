import * as types from '../mutation-types'

export const settingMutations = {
  [types.ALL_ROLES_SUCCESS] (state, payload) {
    state.isLoading = false
    state.roles = payload
  },
  [types.ALL_SETTINGS_SUCCESS] (state, payload) {
    state.isLoading = false
    state.settings = payload
  },
  [types.ALL_COUNTRIES_SUCCESS] (state, payload) {
    state.isLoading = false
    state.countries = payload
  }
}

