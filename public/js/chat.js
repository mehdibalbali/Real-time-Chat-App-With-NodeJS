const socket =  io()

socket.on('message', (message) => {
    console.log(message)
})

document.querySelector('#form').addEventListener('submit', (e) =>{
    console.log('clicked!!')
    e.preventDefault() //to disable auto-refresh on browser 
    const message = document.querySelector('input').value
    const msg = document.getElementById('message').value
    
    socket.emit('send', msg)
})
