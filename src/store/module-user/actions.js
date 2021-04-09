import ServiceUser from 'src/services/ServiceUser'

export async function getAllUsers ({commit}) {
  return ServiceUser.syncUsers().then(response => {
    commit('SET_USERS', response.data)
  }).catch(erro => {
    return new Error(erro)
  })
}

export async function addUser ({commit, state}, val) {
  return ServiceUser.addUser(val).then(response => {
    commit('SET_USERS', [...state.users, response.data ])
  }).catch(erro => {
    return new Error(erro)
  })
}

export async function editUser ({commit, state}, val) {
  return ServiceUser.editUser(val).then(response => {
    let updatedUser = response
    let updatedUsers = state.users.map(user => {
      if (user.id === updatedUser.id) {
        return updatedUser
      }
      return user
    })

    commit('SET_USERS', updatedUsers)
  }).catch(erro => {
    return new Error(erro)
  })
}

export async function deleteUser ({commit, state}, val) {
  return ServiceUser.deleteUser(val).then(response => {
    let deletedUser = response
    let updatedUsers = state.users.filter(user => user.id !== deletedUser.id)
    commit('SET_USERS', updatedUsers)
  }).catch(erro => {
    return new Error(erro)
  })
}