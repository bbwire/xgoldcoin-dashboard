import Api from '@/services/Api.js'

export default {
  getSingleUser (id) {
    return Api().get('/v1/clients/' + id)
  },
  updateUser (id, data) {
    return Api().post('/v1/clients/' + id, data)
  },
  userLogin (data) {
    return Api().post('/v1/client/login', data)
  },
  passwordRecovery (data) {
    return Api().post('/v1/clients/password/recovery', data)
  },
  accountVerification (token) {
    return Api().get('/v1/client/account/verification/' + token)
  },
  getAccountBalance (id) {
    return Api().get('/v1/accounts/balance/user/' + id)
  },
  getPayments () {
    return Api().get('/v1/payments')
  },
  getPaymentsByUser (id) {
    return Api().get('/v1/payments/user/' + id)
  },
  addPayment (data) {
    return Api().post('/v1/payments', data)
  },
  buyCredit (data) {
    return Api().post('/v1/payments/buy/credit', data)
  },
  updatePayment (id, data) {
    return Api().put('/v1/payments/' + id, data)
  },
  deletePayment (id) {
    return Api().delete('/v1/payments/' + id)
  },
}
