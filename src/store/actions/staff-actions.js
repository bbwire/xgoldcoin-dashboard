import service from '@/services/UserService'

import * as types from '../mutation-types'

export const staffActions = {
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
  // Update user
  updateUser ({commit}, payload) {
    commit(types.START_LOADING)
    service.updateUser(payload.id, payload.data).then(response => {
      if (response.data.error === false) {
        console.log(response.data.message)
        // dispatch('getUsers')
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
    let self = this
    service.userLogin(data).then(response => {
      if (response.data.error === false) {
        console.log(response.data)
        self._vm.$session.start()
        self._vm.$session.set('uid', response.data.data.id)
        location.reload()
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
  passwordRecovery ({commit}, data) {
    commit(types.START_LOADING)
    service.passwordRecovery(data).then(response => {
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
  },  
  accountVerification ({commit}, token) {
    commit(types.START_LOADING)
    service.accountVerification(token).then(response => {
      if (response.data.error === false) {
        console.log(response.data.message)
        // dispatch('getUsers')
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
}
