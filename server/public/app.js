const socket = io('https://api.render.com/deploy/srv-cngvn8nsc6pc73b669ig?key=mgbJFdC5CDs')

const activity = document.querySelector('.activity')
const msgInput = document.querySelector('input')

function sendMessage(e) {
    e.preventDefault()
    if (msgInput.value) {
        socket.emit('message', msgInput.value)
        msgInput.value = ""
    }
    msgInput.focus()
}

document.querySelector('form')
    .addEventListener('submit', sendMessage)

//listen for messages

socket.on("message", (data) => {
    activity.textContent = ""
    const li = document.createElement('li')
    li.textContent = data
    document.querySelector('ul').appendChild(li)
})

msgInput.addEventListener('keypress', () => {
    socket.emit('activity', socket.id.substring(0, 5))
})
let activityTimer
socket.on('activity', (name) => {
    activity.textContent = `${name} is typing...`

    clearTimeout(activityTimer)
    activityTimer = setTimeout(() => {
        activity.textContent = ""
    }, 1500)
    })