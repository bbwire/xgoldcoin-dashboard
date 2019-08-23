import service from '@/services/ApplicationService'

import * as types from '../mutation-types'

export const applicationActions = {
  // get all applications
  getApplications ({commit}) {
    commit(types.START_LOADING)
    service.getApplications().then(response => {
      if (response.data.error === false) {
        commit(types.ALL_APPLICATIONS_SUCCESS, response.data.data)
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
  // get single application
  getSingleApplication({commit}, id) {
    commit(types.START_LOADING)
    service.getSingleApplication(id).then(response => {
      if (response.data.error === false) {
        console.log(response.data)
        commit(types.SINGLE_APPLICATION_SUCCESS, response.data.data)
      } else {
        console.log(response.data.message)
        commit(types.ERROR_MESSAGE, response.data.message)
      }
    }).catch(error => {
      console.log(error.message)
      commit(types.CONNECTION_ERROR_MESSAGE)
    })
  },
  // Add new application
  addApplication ({commit, dispatch}, data) {
    commit(types.START_LOADING)
    service.addApplication(data).then(response => {
      if (response.data.error === false) {
        console.log(response.data.message)
        dispatch('getApplications')
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
  // Update application
  updateApplication ({commit, dispatch}, payload) {
    commit(types.START_LOADING)
    service.updateApplication(payload.id, payload.data).then(response => {
      if (response.data.error === false) {
        console.log(response.data.message)
        dispatch('getApplications')
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
  // Delete application
  deleteApplication ({commit, dispatch}, id) {
    commit(types.START_LOADING)
    service.deleteApplication(id).then(response => {
      if (response.data.error === false) {
        console.log(response.data)
        dispatch('getApplications')
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
