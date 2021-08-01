const socket = io()
const messageList = document.getElementById('messages')
const form = document.getElementById('input-form')
const messageInput = document.getElementById('message')
const onlineUsersList = document.getElementById('connected-users')

socket.on('connect', () => {
  let userName = prompt('Please enter your name!')
  userName && socket.emit('join', { id: socket.id, users: [], userName })
})
socket.on('join', ({ id, users, userStatus }) => {
  const message = document.createElement('li')
  message.id = id
  message.className = 'message-list-item'
  message.textContent = userStatus
  userStatus.includes('left')
    ? message.classList.add('user-left')
    : message.classList.add('user-joined')
  messages.appendChild(message)
  // window.scrollTo(0, document.body.scrollHeight)
  if (userStatus.includes('left')) {
    onlineUsersList.innerHTML = ''
    users.forEach((user) => {
      const onlineUser = document.createElement('li')
      onlineUser.textContent = user.username
      onlineUsersList.appendChild(onlineUser)
    })
  } else {
    onlineUsersList.innerHTML = ''
    users.forEach((user) => {
      const onlineUser = document.createElement('li')
      onlineUser.textContent = user.username
      onlineUsersList.appendChild(onlineUser)
    })
  }
  console.log(users)
})
form.addEventListener('submit', (event) => {
  event.preventDefault()
  console.log(event)
  if (messageInput.value) {
    socket.emit('chat-message', messageInput.value)
    messageInput.value = ''
  }
})
socket.on('chat-message', (msg) => {
  const message = document.createElement('li')
  message.className = 'message-list-item'
  message.textContent = msg.replace('You:', '')
  msg.includes('You: ') && message.classList.add('my-message')
  messages.appendChild(message)
  window.scrollTo(0, document.body.scrollHeight)
})
