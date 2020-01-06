const express = require('express')
const path = require('path')
const http = require('http')
const socketio = require('socket.io')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

const port = process.env.PORT || 3000
const publicDirectoryPath = path.join(__dirname,'../public')

app.use(express.static(publicDirectoryPath))

io.on('connection', (socket) =>{
    console.log('New web soket')
    
    socket.emit('message', 'welcome')
    socket.broadcast.emit('message','A new user hase join the chat room')
    socket.on('send',(message, callback) =>{
        io.emit('message', message)
        callback()
    })

    socket.on('sendLocation', (location, callback) => {
        io.emit('locationMessage',location)
        callback()
    })
    socket.on('disconnect', () => {
        io.emit('message', 'A user has disconnected')
    })
})
server.listen(port, () =>{
    console.log(`Server is running on port ${port} !`)
})
