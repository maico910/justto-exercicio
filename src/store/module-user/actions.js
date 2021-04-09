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
