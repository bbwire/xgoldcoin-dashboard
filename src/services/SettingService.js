/* eslint-disable */
import Api from '@/services/Api.js'

export default {
  // Rate services
  getRates () {
    return Api().get('/v1/sms/rates')
  },
  addRate (data) {
    return Api().post('/v1/sms/rates', data)
  },
  editRate (id, data) {
    return Api().put('/v1/sms/rates/' + id, data)
  },
  deleteRate (id) {
    return Api().delete('/v1/sms/rates/' + id)
  },
  // Roles services
  getRoles () {
    return Api().get('/v1/roles')
  },
  addRole (data) {
    return Api().post('/v1/roles', data)
  },
  editRole (id, data) {
    return Api().put('/v1/roles/' + id, data)
  },
  deleteRole (id) {
    return Api().delete('/v1/roles/' + id)
  },
  // Settings
  getSettings () {
    return Api().get('/v1/settings')
  },
  addSettings (data) {
    return Api().post('/v1/settings', data)
  },
  editSettings (id, data) {
    return Api().post('/v1/settings/' + id, data)
  },
  downloadContract () {
    Api().get('/v1/downloads/contacts/template', {responseType: 'blob'})
      .then(response => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'contacts-template.xlsx'); //or any other extension
        document.body.appendChild(link);
        link.click();
      }).catch(function (res) {
        console.log(res) 
      })
  },
  downloadFile (response, filename) {
    // It is necessary to create a new blob object with mime-type explicitly set
    // otherwise only Chrome works like it should
    var newBlob = new Blob([response.body], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'})

    // IE doesn't allow using a blob object directly as link href
    // instead it is necessary to use msSaveOrOpenBlob
    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
      window.navigator.msSaveOrOpenBlob(newBlob)
      return
    }

    // For other browsers:
    // Create a link pointing to the ObjectURL containing the blob.
    const data = window.URL.createObjectURL(newBlob)
    var link = document.createElement('a')
    link.href = data
    link.download = filename + '.xlsx'
    link.click()
    setTimeout(function () {
      // For Firefox it is necessary to delay revoking the ObjectURL
      window.URL.revokeObjectURL(data)
    }, 10000)
  }
}
