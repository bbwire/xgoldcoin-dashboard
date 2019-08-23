import Api from '@/services/Api.js'

export default {
  getApplications () {
    return Api().get('/v1/applications')
  },
  getSingleApplication(id) {
    return Api().get('/v1/applications/' + id)
  },
  addApplication (data) {
    return Api().post('/v1/applications', data)
  },
  updateApplication (id, data) {
    return Api().put('/v1/applications/' + id, data)
  },
  deleteApplication (id) {
    return Api().delete('/v1/applications/' + id)
  }
}
