/* eslint-disable no-console */
import service from '@/services/SettingService'

import * as types from '../mutation-types'

export const settingActions = {
  // load all roles
  getRoles ({commit}) {
    commit(types.START_LOADING)
    service.getRoles().then(response => {
      if (response.data.error === false) {
        commit(types.ALL_ROLES_SUCCESS, response.data.data)
        console.log(response.data)
        // commit(types.SUCCESS_MESSAGE, response.data.message)
      } else {
        console.log(response.data.message)
        commit(types.ERROR_MESSAGE, response.data.message)
      }
    }).catch(error => {
      console.log(error.message)
      commit(types.CONNECTION_ERROR_MESSAGE)
    })
  },
  // Add new role
  addRole ({commit, dispatch}, data) {
    commit(types.START_LOADING)
    service.addRole(data).then(response => {
      if (response.data.error === false) {
        console.log(response.data.message)
        dispatch('getRoles')
        commit(types.SUCCESS_MESSAGE, response.data.message)
      } else {
        console.log(response.data.message)
        commit(types.ERROR_MESSAGE, response.data.message)
      }
    }).catch(error => {
      console.log(error.message)
      commit(types.CONNECTION_ERROR_MESSAGE)
    })
  },
  // Update role
  updateRole ({commit, dispatch}, payload) {
    commit(types.START_LOADING)
    service.editRole(payload.id, payload.data).then(response => {
      if (response.data.error === false) {
        console.log(response.data.message)
        dispatch('getRoles')
        commit(types.SUCCESS_MESSAGE, response.data.message)
      } else {
        console.log(response.data.message)
        commit(types.ERROR_MESSAGE, response.data.message)
      }
    }).catch(error => {
      console.log(error.message)
      commit(types.CONNECTION_ERROR_MESSAGE)
    })
  },
  // Delete role
  deleteRole ({commit, dispatch}, id) {
    commit(types.START_LOADING)
    service.deleteRole(id).then(response => {
      if (response.data.error === false) {
        console.log(response.data.message)
        dispatch('getRoles')
        commit(types.SUCCESS_MESSAGE, response.data.message)
      } else {
        console.log(response.data.message)
        commit(types.ERROR_MESSAGE, response.data.message)
      }
    }).catch(error => {
      console.log(error.message)
      commit(types.CONNECTION_ERROR_MESSAGE)
    })
  },
  // get settings
  getSettings ({commit}) {
    commit(types.START_LOADING)
    service.getSettings().then(response => {
      if (response.data.error === false) {
        commit(types.ALL_SETTINGS_SUCCESS, response.data.data)
        console.log(response.data)
        // commit(types.SUCCESS_MESSAGE, response.data.message)
      } else {
        console.log(response.data.message)
        commit(types.ERROR_MESSAGE, response.data.message)
      }
    }).catch(error => {
      console.log(error.message)
      commit(types.CONNECTION_ERROR_MESSAGE)
    })
  },
  // Add settings
  addSettings ({commit, dispatch}, data) {
    commit(types.START_LOADING)
    service.addSettings(data).then(response => {
      if (response.data.error === false) {
        console.log(response.data.message)
        dispatch('getSettings')
        commit(types.SUCCESS_MESSAGE, response.data.message)
      } else {
        console.log(response.data.message)
        commit(types.ERROR_MESSAGE, response.data.message)
      }
    }).catch(error => {
      console.log(error.message)
      commit(types.CONNECTION_ERROR_MESSAGE)
    })
  },
  // Update settings
  editSettings ({commit, dispatch}, payload) {
    commit(types.START_LOADING)
    service.editSettings(payload.id, payload.data).then(response => {
      if (response.data.error === false) {
        console.log(response.data.message)
        dispatch('getSettings')
        commit(types.SUCCESS_MESSAGE, response.data.message)
      } else {
        console.log(response.data.message)
        commit(types.ERROR_MESSAGE, response.data.message)
      }
    }).catch(error => {
      console.log(error.message)
      commit(types.CONNECTION_ERROR_MESSAGE)
    })
  }
}
