import service from '@/services/UserService'

import * as types from '../mutation-types'

export const staffActions = {
  // get all users
  getUsers ({commit}) {
    commit(types.START_LOADING)
    service.getUsers().then(response => {
      if (response.data.error === false) {
        commit(types.ALL_USERS_SUCCESS, response.data.data)
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
  // get single user
  getSingleUser ({commit}, id) {
    commit(types.START_LOADING)
    service.getSingleUser(id).then(response => {
      if (response.data.error === false) {
        console.log(response.data)
        commit(types.SINGLE_USER_SUCCESS, response.data.data)
      } else {
        console.log(response.data.message)
        commit(types.ERROR_MESSAGE, response.data.message)
      }
    }).catch(error => {
      console.log(error.message)
      commit(types.CONNECTION_ERROR_MESSAGE)
    })
  },
  // get single user
  getCurrentUser ({commit}, id) {
    commit(types.START_LOADING)
    service.getSingleUser(id).then(response => {
      if (response.data.error === false) {
        console.log(response.data)
        commit(types.CURRENT_USER_SUCCESS, response.data.data)
      } else {
        console.log(response.data.message)
        commit(types.ERROR_MESSAGE, response.data.message)
      }
    }).catch(error => {
      console.log(error.message)
      commit(types.CONNECTION_ERROR_MESSAGE)
    })
  },
  // Add new user
  addUser ({commit, dispatch}, data) {
    commit(types.START_LOADING)
    service.addUser(data).then(response => {
      if (response.data.error === false) {
        console.log(response.data.message)
        dispatch('getUsers')
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
  // Update user
  updateUser ({commit, dispatch}, payload) {
    commit(types.START_LOADING)
    service.updateUser(payload.id, payload.data).then(response => {
      if (response.data.error === false) {
        console.log(response.data.message)
        dispatch('getUsers')
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
  // Delete user
  deleteUser ({commit, dispatch}, id) {
    commit(types.START_LOADING)
    service.deleteUser(id).then(response => {
      if (response.data.error === false) {
        console.log(response.data)
        dispatch('getUsers')
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
  // user login
  userLogin ({commit}, data) {
    commit(types.START_LOADING)
    service.userLogin(data).then(response => {
      if (response.data.error === false) {
        console.log(response.data)
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
  // get account balance
  getAccountBalance ({commit}, id) {
    commit(types.START_LOADING)
    service.getAccountBalance(id).then(response => {
      if (response.data.error === false) {
        console.log(response.data)
        commit(types.ACCOUNT_BALANCE_SUCCESS, response.data.data)
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
