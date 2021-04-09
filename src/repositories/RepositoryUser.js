import userApi from '../../../justto_old/src/components/Api/Users'

export default {
  getAllUsers () {
    return userApi.getAllUsers()
  },

  addUser (data) {
    return userApi.addUser(data)
  },

  editUser (data) {
    return userApi.editUser(data)
  },

  deleteUser (id) {
    return userApi.deleteUser(id)
  }
}
