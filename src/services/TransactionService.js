import Api from '@/services/Api.js'

export default {
  getBitcoinTransactionsByClient (id) {
    return Api().get('/v1/bitcoin/transactions/client/' + id)
  },
  addBitcoinTransaction (data) {
    return Api().post('/v1/bitcoin/transactions', data)
  },
  updateBitcoinTransaction (id, data) {
    return Api().post('/v1/bitcoin/transactions/' + id, data)
  },
  deleteBitcoinTransaction (id) {
    return Api().delete('/v1/bitcoin/transactions/' + id)
  },
  getXgoldTransactionsByClient (id) {
    return Api().get('/v1/xgold/transactions/client/' + id)
  },
  addXgoldTransaction (data) {
    return Api().post('/v1/xgold/transactions', data)
  },
  updateXgoldTransaction (id, data) {
    return Api().post('/v1/xgold/transactions/' + id, data)
  },
  deleteXgoldTransaction (id) {
    return Api().delete('/v1/xgold/transactions/' + id)
  }
}
