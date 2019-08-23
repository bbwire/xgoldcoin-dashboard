import Api from '@/services/Api.js'

export default {
  getProjects () {
    return Api().get('/v1/projects')
  },
  getSingleProject (id) {
    return Api().get('/v1/projects/' + id)
  },
  addProject (data) {
    return Api().post('/v1/projects', data)
  },
  updateProject (id, data) {
    return Api().put('/v1/projects/' + id, data)
  },
  deleteProject (id) {
    return Api().delete('/v1/projects/' + id)
  }
}
