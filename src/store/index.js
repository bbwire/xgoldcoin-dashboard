import Vue from 'vue'
import Vuex from 'vuex'

// States
import state from './states'

// Import Actions
import { commonActions } from './actions/common-actions'
import { staffActions } from './actions/staff-actions'
import { settingActions } from './actions/setting-actions'
import { clientActions } from './actions/client-actions'
import { loanActions } from './actions/loan-actions'

// Import Mutations
import { commonMutations } from './mutations/common-mutations'
import { majorMutations } from './mutations/major-mutations'
import { staffMutations } from './mutations/staff-mutations'
import { settingMutations } from './mutations/setting-mutations'

Vue.use(Vuex)

export default new Vuex.Store(
  {
    state: Object.assign({}, state),
    getters: {
      // isLoading: state => {
      //   state.isLoading
      // }
    },
    // Actions
    actions: Object.assign({},
      commonActions,
      staffActions,
      settingActions,
      clientActions,
      loanActions,
    ),
    // Mutations
    mutations: Object.assign({}, commonMutations, majorMutations, staffMutations, settingMutations)
  }
)