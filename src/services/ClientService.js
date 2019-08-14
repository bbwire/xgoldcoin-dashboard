import Api from '@/services/Api.js'

export default {
  getClients () {
    return Api().get('/v1/clients')
  },
  getSingleClient (id) {
    return Api().get('/v1/clients/' + id)
  },
  addClient (data) {
    return Api().post('/v1/clients', data)
  },
  updateClient (id, data) {
    return Api().put('/v1/clients/' + id, data)
  },
  deleteClient (id) {
    return Api().delete('/v1/clients/' + id)
  }
}
