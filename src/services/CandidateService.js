import Api from '@/services/Api.js'

export default {
  getCandidates () {
    return Api().get('/v1/candidates')
  },
  getSingleCandidate (id) {
    return Api().get('/v1/candidates/' + id)
  },
  addCandidate (data) {
    return Api().post('/v1/candidates', data)
  },
  updateCandidate (id, data) {
    return Api().put('/v1/candidates/' + id, data)
  },
  deleteCandidate (id) {
    return Api().delete('/v1/candidates/' + id)
  }
}
