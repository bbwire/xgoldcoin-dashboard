import Api from '@/services/Api.js'

export default {
  getRoles () {
    return Api().get('/v1/roles')
  },
  getSingleRole (id) {
    return Api().get('/v1/roles/' + id)
  },
  addRole (data) {
    return Api().post('/v1/roles', data)
  },
  updateRole (id, data) {
    return Api().put('/v1/roles/' + id, data)
  },
  deleteRole (id) {
    return Api().delete('/v1/roles/' + id)
  }
}
