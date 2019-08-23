import Api from '@/services/Api.js'

export default {
  getUsers () {
    return Api().get('/v1/users')
  },
  getSingleUser (id) {
    return Api().get('/v1/users/' + id)
  },
  addUser (data) {
    return Api().post('/v1/users', data)
  },
  updateUser (id, data) {
    return Api().post('/v1/users/' + id, data)
  },
  deleteUser (id) {
    return Api().delete('/v1/users/' + id)
  },
  userLogin (data) {
    return Api().post('/v1/user/login', data)
  },
  passwordRecovery (data) {
    return Api().post('/v1/users/password/recovery', data)
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
