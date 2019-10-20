import Api from '@/services/Api.js'

export default {
  getSingleUser (id) {
    return Api().get('/v1/members/' + id)
  },
  getUserByUsername (username) {
    return Api().get('/v1/members/user/' + username)
  },
  updateUser (id, data) {
    return Api().post('/v1/members/' + id, data)
  },
  userLogin (data) {
    return Api().post('/v1/member/login', data)
  },
  passwordRecovery (data) {
    return Api().post('/v1/members/password/recovery', data)
  },
  accountVerification (token) {
    return Api().get('/v1/member/account/verification/' + token)
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
  uploadDoc (data) {
    return Api().post('/v1/identity/documents', data)
  },
}
