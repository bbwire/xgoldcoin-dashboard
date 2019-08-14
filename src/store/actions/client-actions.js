import service from '@/services/ClientService'

import * as types from '../mutation-types'

export const clientActions = {
  // get all clients
  getClients ({commit}) {
    commit(types.START_LOADING)
    service.getClients().then(response => {
      if (response.data.error === false) {
        commit(types.ALL_CLIENTS_SUCCESS, response.data.data)
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
  // get single client
  getSingleClient({commit}, id) {
    commit(types.START_LOADING)
    service.getSingleClient(id).then(response => {
      if (response.data.error === false) {
        console.log(response.data)
        commit(types.SINGLE_CLIENT_SUCCESS, response.data.data)
      } else {
        console.log(response.data.message)
        commit(types.ERROR_MESSAGE, response.data.message)
      }
    }).catch(error => {
      console.log(error.message)
      commit(types.CONNECTION_ERROR_MESSAGE)
    })
  },
  // Add new client
  addClient ({commit, dispatch}, data) {
    commit(types.START_LOADING)
    service.addClient(data).then(response => {
      if (response.data.error === false) {
        console.log(response.data.message)
        dispatch('getClients')
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
  // Update client
  updateClient ({commit, dispatch}, payload) {
    commit(types.START_LOADING)
    service.updateClient(payload.id, payload.data).then(response => {
      if (response.data.error === false) {
        console.log(response.data.message)
        dispatch('getClients')
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
  // Delete client
  deleteClient ({commit, dispatch}, id) {
    commit(types.START_LOADING)
    service.deleteClient(id).then(response => {
      if (response.data.error === false) {
        console.log(response.data)
        dispatch('getClients')
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
