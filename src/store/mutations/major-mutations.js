import * as types from '../mutation-types'

export const majorMutations = {
  // Major mutations
  [types.ALL_CLIENTS_SUCCESS] (state, payload) {
    state.isLoading = false
    state.clients = payload
  },
  [types.SINGLE_CLIENT_SUCCESS] (state, payload) {
    state.isLoading = false
    state.single_client = payload
  },
  [types.ALL_CANDIDATES_SUCCESS] (state, payload) {
    state.isLoading = false
    state.candidates = payload
  },
  [types.SINGLE_CANDIDATE_SUCCESS] (state, payload) {
    state.isLoading = false
    state.single_candidate = payload
  },
  [types.ALL_APPLICATIONS_SUCCESS] (state, payload) {
    state.isLoading = false
    state.applications = payload
  },
  [types.SINGLE_APPLICATION_SUCCESS] (state, payload) {
    state.isLoading = false
    state.single_application = payload
  },
  [types.ALL_PROJECTS_SUCCESS] (state, payload) {
    state.isLoading = false
    state.projects = payload
  },
  [types.SINGLE_PROJECT_SUCCESS] (state, payload) {
    state.isLoading = false
    state.single_project = payload
  },
}
