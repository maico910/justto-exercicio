import ServiceUser from 'src/services/ServiceUser'

export async function getAllUsers ({commit}) {
  return ServiceUser.syncUsers().then(response => {
    commit('SET_USERS', response.data)
  }).catch(erro => {
    return new Error(erro)
  })
}
}
