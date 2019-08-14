import service from '@/services/LoanService'

import * as types from '../mutation-types'

export const loanActions = {
  // get all loans
  getLoans ({commit}) {
    commit(types.START_LOADING)
    service.getLoans().then(response => {
      if (response.data.error === false) {
        commit(types.ALL_LOANS_SUCCESS, response.data.data)
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
  // get single loan
  getSingleLoan({commit}, id) {
    commit(types.START_LOADING)
    service.getSingleLoan(id).then(response => {
      if (response.data.error === false) {
        console.log(response.data)
        commit(types.SINGLE_LOAN_SUCCESS, response.data.data)
      } else {
        console.log(response.data.message)
        commit(types.ERROR_MESSAGE, response.data.message)
      }
    }).catch(error => {
      console.log(error.message)
      commit(types.CONNECTION_ERROR_MESSAGE)
    })
  },
  // Add new loan
  addLoan ({commit, dispatch}, data) {
    commit(types.START_LOADING)
    service.addLoan(data).then(response => {
      if (response.data.error === false) {
        console.log(response.data.message)
        dispatch('getLoans')
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
  // Update loan
  updateLoan ({commit, dispatch}, payload) {
    commit(types.START_LOADING)
    service.updateLoan(payload.id, payload.data).then(response => {
      if (response.data.error === false) {
        console.log(response.data.message)
        dispatch('getLoans')
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
  // Delete loan
  deleteLoan ({commit, dispatch}, id) {
    commit(types.START_LOADING)
    service.deleteLoan(id).then(response => {
      if (response.data.error === false) {
        console.log(response.data)
        dispatch('getLoans')
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
  getLoanSchedule ({commit}, payload) {
    commit(types.START_LOADING)
    service.getLoanSchedule(payload).then(response => {
      if (response.data.error === false) {
        commit(types.LOAN_SCHEDULE_SUCCESS, response.data.data)
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
  }
}
