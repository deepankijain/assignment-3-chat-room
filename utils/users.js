let users = []

const usersJoined = (id, username) => {
  const user = {
    id,
    username,
  }

  users.push(user)

  return users
}
const userLeave = (id) => {
  users = users.filter((item) => item.id !== id)
  return users
}
module.exports = { usersJoined, userLeave }
