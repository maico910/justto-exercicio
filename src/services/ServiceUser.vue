<script>
import RepositoryUser from '../repositories/RepositoryUser'

export default {
  async syncUsers () {
    return RepositoryUser.getAllUsers('users').then(response => {
      if (![200, 201].includes(response.status)) {
        throw new Error(response.statusText)
      }
      return response
    })
    .catch(erro => {
      throw new Error(erro)
    })
  },


  async addUser (data) {
    return RepositoryUser.addUser(data).then(response => {
      if (![200, 201].includes(response.status)) {
        throw new Error(response.statusText)
      }
      return response
    }).catch(erro => {
      throw new Error(erro)
    })
  },

  async editUser (data) {
    return RepositoryUser.editUser(data).then(response => {
      if (![200, 201].includes(response.status)) {
        throw new Error(response.statusText)
      }
      return response.data
    }).catch(erro => {
      throw new Error(erro)
    })
  },

  async deleteUser (id) {
    return RepositoryUser.deleteUser(id).then(response => {
      console.log(response)
      if (![200, 201].includes(response.status)) {
        throw new Error(response.statusText)
      }
      return response.data
    }).catch(erro => {
      throw new Error(erro)
    })
  }
}
</script>