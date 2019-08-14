import Api from '@/services/Api.js'

export default {
  getLoans () {
    return Api().get('/v1/loans')
  },
  getSingleLoan (id) {
    return Api().get('/v1/loans/' + id)
  },
  addLoan(data) {
    return Api().post('/v1/loans', data)
  },
  updateLoan (id, data) {
    return Api().put('/v1/loans/' + id, data)
  },
  deleteLoan (id) {
    return Api().delete('/v1/loans/' + id)
  },
  getLoanSchedule (id) {
    return Api().get('/v1/loans/schedule/loan/' + id)
  },
}
