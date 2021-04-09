export function users (state) {
  return state.users
}

export function userById (state) {
  return (id) => {
    return state.users.find(user => user.id === id)
  }
}