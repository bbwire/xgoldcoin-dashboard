import * as types from '../mutation-types'

export const commonActions = {
  // Change menu display
  changeMenuDisplay ({commit}, payload) {
    commit(types.HIDE_SHOW_MENUS, payload)
  }
}
