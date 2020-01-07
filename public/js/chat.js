const socket =  io()

// Elements
const messageForm = document.querySelector('#form')
const messageFormInput = messageForm.querySelector('input')
const messageFormButton = messageForm.querySelector('button')
const sendLocationButton = document.querySelector('#locationButton')
const messages = document.querySelector('#messages')

// Templates
const messageTemplate = document.querySelector('#message-template').innerHTML
const locationMessageTemplate = document.querySelector('#location-template').innerHTML

// options
const {username, room} = Qs.parse(location.search,{ignoreQueryPrefix: true})

socket.on('message', (message) => {
    const html = Mustache.render(messageTemplate, {
        message: message.text,
        createdAt: moment(message.createdAt).format('h:mm a')
    })
    messages.insertAdjacentHTML('beforeend', html)
    console.log(message)
})
socket.on('locationMessage', (message) => {
    console.log(message)
    const html = Mustache.render(locationMessageTemplate, {
        url: message.url,
        createdAt: moment(message.createdAt).format('h:mm a')
    })
    messages.insertAdjacentHTML('beforeend',html)
})
messageForm.addEventListener('submit', (e) =>{
    
    e.preventDefault() //to disable auto-refresh on browser 
    //const message = document.querySelector('input').value
    messageFormButton.setAttribute('disabled', 'disabled')
    const msg = document.getElementById('message').value
    
    socket.emit('send', msg, () =>{
        messageFormButton.removeAttribute('disabled')
        messageFormInput.value=''
        messageFormInput.focus()

        console.log('The message was delevred! ')
    })
})

sendLocationButton.addEventListener('click', () =>{
    if(!navigator.geolocation){
        return alert('Geloloalisation is not supported by your browser')
    }

    sendLocationButton.setAttribute('disabled', 'disabled')
    navigator.geolocation.getCurrentPosition((position) =>{
        const latitude = position.coords.latitude
        const longitude = position.coords.longitude
        const msg = 'https://google.com/maps?q='+ latitude+','+longitude

        socket.emit('sendLocation',msg, () =>{
            sendLocationButton.removeAttribute('disabled')
            console.log('location shared')
        })

    })
})

socket.emit('join', {username, room}, (error) => {
    if (error){
        alert(error )
        location.href= '/'
    }
})