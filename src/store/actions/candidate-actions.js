import service from '@/services/CandidateService'

import * as types from '../mutation-types'

export const candidateActions = {
  // get all candidates
  getCandidates ({commit}) {
    commit(types.START_LOADING)
    service.getCandidates().then(response => {
      if (response.data.error === false) {
        commit(types.ALL_CANDIDATES_SUCCESS, response.data.data)
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
  // get single candidate
  getSingleCandidate({commit}, id) {
    commit(types.START_LOADING)
    service.getSingleCandidate(id).then(response => {
      if (response.data.error === false) {
        console.log(response.data)
        commit(types.SINGLE_CANDIDATE_SUCCESS, response.data.data)
      } else {
        console.log(response.data.message)
        commit(types.ERROR_MESSAGE, response.data.message)
      }
    }).catch(error => {
      console.log(error.message)
      commit(types.CONNECTION_ERROR_MESSAGE)
    })
  },
  // Add new candidate
  addCandidate ({commit, dispatch}, data) {
    commit(types.START_LOADING)
    service.addCandidate(data).then(response => {
      if (response.data.error === false) {
        console.log(response.data.message)
        dispatch('getCandidates')
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
  // Update candidate
  updateCandidate ({commit, dispatch}, payload) {
    commit(types.START_LOADING)
    service.updateCandidate(payload.id, payload.data).then(response => {
      if (response.data.error === false) {
        console.log(response.data.message)
        dispatch('getCandidates')
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
  // Delete candidate
  deleteCandidate ({commit, dispatch}, id) {
    commit(types.START_LOADING)
    service.deleteCandidate(id).then(response => {
      if (response.data.error === false) {
        console.log(response.data)
        dispatch('getCandidates')
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
