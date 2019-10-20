import service from '@/services/ProjectService'

import * as types from '../mutation-types'

export const projectActions = {
  // get transactions by cllient
  getBitcoinTransactionsByClient({commit}, id) {
    commit(types.START_LOADING)
    service.getBitcoinTransactionsByClient(id).then(response => {
      if (response.data.error === false) {
        console.log(response.data)
        commit(types.BITCOIN_TRANSACTIONS_BY_CLIENT_SUCCESS, response.data.data)
      } else {
        console.log(response.data.message)
        commit(types.ERROR_MESSAGE, response.data.message)
      }
    }).catch(error => {
      console.log(error.message)
      commit(types.CONNECTION_ERROR_MESSAGE)
    })
  },
  // Add new trasaction
  addBitcoinTransaction ({commit, dispatch}, data) {
    commit(types.START_LOADING)
    service.addBitcoinTransaction(data).then(response => {
      if (response.data.error === false) {
        console.log(response.data.message)
        dispatch('getBitcoinTransactionsByClient', data.member_id)
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
  // Update transaction
  updateBitcoinTransaction ({commit, dispatch}, payload) {
    commit(types.START_LOADING)
    service.updateBitcoinTransaction(payload.id, payload.data).then(response => {
      if (response.data.error === false) {
        console.log(response.data.message)
        dispatch('getBitcoinTransactionsByClient', data.member_id)
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
  getXgoldTransactionsByClient({commit}, id) {
    commit(types.START_LOADING)
    service.getXgoldTransactionsByClient(id).then(response => {
      if (response.data.error === false) {
        console.log(response.data)
        commit(types.XGOLD_TRANSACTIONS_BY_CLIENT_SUCCESS, response.data.data)
      } else {
        console.log(response.data.message)
        commit(types.ERROR_MESSAGE, response.data.message)
      }
    }).catch(error => {
      console.log(error.message)
      commit(types.CONNECTION_ERROR_MESSAGE)
    })
  },
  // Add new trasaction
  addXgoldTransaction ({commit, dispatch}, data) {
    commit(types.START_LOADING)
    service.addTransaction(data).then(response => {
      if (response.data.error === false) {
        console.log(response.data.message)
        dispatch('getTransactionsByClient', data.client_id)
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
  // Update transaction
  updateXgoldTransaction ({commit, dispatch}, payload) {
    commit(types.START_LOADING)
    service.updateXgoldTransaction(payload.id, payload.data).then(response => {
      if (response.data.error === false) {
        console.log(response.data.message)
        dispatch('getXgoldTransactionsByClient', data.member_id)
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
  // Delete project
  deleteApplication ({commit, dispatch}, id) {
    commit(types.START_LOADING)
    service.deleteApplication(id).then(response => {
      if (response.data.error === false) {
        console.log(response.data)
        dispatch('getProjects')
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
