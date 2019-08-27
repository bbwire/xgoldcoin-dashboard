import service from '@/services/ClientService'
import router from '../../router';

import * as types from '../mutation-types'

export const clientActions = {
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
  addClient ({commit}, data) {
    commit(types.START_LOADING)
    service.addClient(data).then(response => {
      if (response.data.error === false) {
        console.log(response.data.message)
        router.push('/login')
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
  updateClient ({commit}, payload) {
    commit(types.START_LOADING)
    service.updateClient(payload.id, payload.data).then(response => {
      if (response.data.error === false) {
        console.log(response.data.message)
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
  getClientContactInfo({commit}, id) {
    commit(types.START_LOADING)
    service.getContactsByClient(id).then(response => {
      if (response.data.error === false) {
        console.log(response.data)
        if (response.data.data !== null) {
          commit(types.CONTACTS_BY_CLIENT_SUCCESS, response.data.data)
        }
      } else {
        console.log(response.data.message)
        commit(types.ERROR_MESSAGE, response.data.message)
      }
    }).catch(error => {
      console.log(error.message)
      commit(types.CONNECTION_ERROR_MESSAGE)
    })
  },
  updateClientContacts ({commit}, payload) {
    commit(types.START_LOADING)
    service.updateClientContacts(payload.id, payload.data).then(response => {
      if (response.data.error === false) {
        console.log(response.data.message)
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
