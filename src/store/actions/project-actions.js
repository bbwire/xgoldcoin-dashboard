import service from '@/services/ProjectService'

import * as types from '../mutation-types'

export const projectActions = {
  // get all projects
  getProjects ({commit}) {
    commit(types.START_LOADING)
    service.getProjects().then(response => {
      if (response.data.error === false) {
        commit(types.ALL_PROJECTS_SUCCESS, response.data.data)
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
  // get single project
  getSingleProject({commit}, id) {
    commit(types.START_LOADING)
    service.getSingleProject(id).then(response => {
      if (response.data.error === false) {
        console.log(response.data)
        commit(types.SINGLE_PROJECT_SUCCESS, response.data.data)
      } else {
        console.log(response.data.message)
        commit(types.ERROR_MESSAGE, response.data.message)
      }
    }).catch(error => {
      console.log(error.message)
      commit(types.CONNECTION_ERROR_MESSAGE)
    })
  },
  // Add new project
  addProject ({commit, dispatch}, data) {
    commit(types.START_LOADING)
    service.addProject(data).then(response => {
      if (response.data.error === false) {
        console.log(response.data.message)
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
  },
  // Update project
  updateProject ({commit, dispatch}, payload) {
    commit(types.START_LOADING)
    service.updateProject(payload.id, payload.data).then(response => {
      if (response.data.error === false) {
        console.log(response.data.message)
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
