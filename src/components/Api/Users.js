import api from './Api'

export default {
  getAllUsers () {
    return api.get('users')
  },

  addUser (data) {
    return api.post('users', data)
  },

  editUser ({ uid, ...data }) {
    return api.put(`users/${uid}`, data)
  },

  deleteUser (uid) {
    return api.delete(`users/${uid}`)
  }
}
