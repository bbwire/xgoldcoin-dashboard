import Api from '@/services/Api.js'

export default {
  getSingleClient (id) {
    return Api().get('/v1/clients/' + id)
  },
  addClient (data) {
    return Api().post('/v1/clients', data)
  },
  updateClient (id, data) {
    return Api().post('/v1/clients/' + id, data)
  },
  deleteClient (id) {
    return Api().delete('/v1/clients/' + id)
  },
  getContactsByClient (id) {
    return Api().get('/v1/client/contacts/company/' + id)
  },
  updateClientContacts (id, data) {
    return Api().post('/v1/client/contacts/' + id, data)
  },
}
