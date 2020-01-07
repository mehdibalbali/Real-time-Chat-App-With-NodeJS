const express = require('express')
const path = require('path')
const http = require('http')
const socketio = require('socket.io')
const {generateMessage,generateLocationMessage} = require('./utils/messages')
const app = express()
const server = http.createServer(app)
const io = socketio(server)

const port = process.env.PORT || 3000
const publicDirectoryPath = path.join(__dirname,'../public')

app.use(express.static(publicDirectoryPath))

io.on('connection', (socket) =>{
    console.log('New web soket')
    
    
   socket.on('join', ({username, room}) => {
        socket.join(room)
       
        socket.emit('message', generateMessage('Welcome! '))
        socket.broadcast.to(room).emit('message',generateMessage(`${username} has join the chat room`))
   
   })
    socket.on('send',(message, callback) =>{
        io.to('hhh').emit('message', generateMessage(message))
        callback()
    })

    socket.on('sendLocation', (location, callback) => {
        io.emit('locationMessage',generateLocationMessage(location))
        callback()
    })
    socket.on('disconnect', () => {
        io.emit('message', generateMessage('A user has disconnected'))
    })
})
server.listen(port, () =>{
    console.log(`Server is running on port ${port} !`)
})
