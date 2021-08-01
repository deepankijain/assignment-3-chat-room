const express = require('express')
const { usersJoined, userLeave } = require('./utils/users')
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server)

app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) => {
  res.sendFile('/index.html')
})
io.on('connection', (socket) => {
  socket.on('join', ({ id, userName }) => {
    socket.name = userName
    const users = usersJoined(id, userName)
    socket.broadcast.emit('join', {
      id,
      userStatus: `${userName} joined!!!`,
      users,
    })
    io.to(id).emit('join', { id, users, userStatus: 'You joined!!!' })
  })
  socket.on('chat-message', (msg) => {
    socket.broadcast.emit('chat-message', `${socket.name}:  ${msg}`)
    io.to(socket.id).emit('chat-message', `You: ${msg}`)
  })
  socket.on('disconnect', () => {
    const users = userLeave(socket.id)
    socket.broadcast.emit('join', {
      id: socket.id,
      users,
      userStatus: `${socket.name} left!!!`,
    })
  })
})
server.listen(80, () => console.log('Server is running on port 3000!'))
