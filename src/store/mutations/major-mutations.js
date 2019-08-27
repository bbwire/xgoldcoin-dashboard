import * as types from '../mutation-types'

export const majorMutations = {
  // Major mutations
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
  [types.PROJECTS_BY_CLIENT_SUCCESS] (state, payload) {
    state.isLoading = false
    state.projects_by_client = payload
  },
  [types.SINGLE_PROJECT_SUCCESS] (state, payload) {
    state.isLoading = false
    state.single_project = payload
  },
  [types.CONTACTS_BY_CLIENT_SUCCESS] (state, payload) {
    state.isLoading = false
    state.client_contact_info = payload
  },
}
