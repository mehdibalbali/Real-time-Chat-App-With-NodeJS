const express = require('express')
const path = require('path')
const http = require('http')
const socketio = require('socket.io')
const {generateMessage,generateLocationMessage} = require('./utils/messages')
const {addUser,removeUser,getUser,getUsersInRoom}  =require('./utils/users')
const app = express()
const server = http.createServer(app)
const io = socketio(server)

const port = process.env.PORT || 3000
const publicDirectoryPath = path.join(__dirname,'../public')

app.use(express.static(publicDirectoryPath))

io.on('connection', (socket) =>{
    console.log('New web soket')
    
    
   socket.on('join', ({username, room}, callback) => {
       const { error,user } = addUser({id: socket.id, username, room})
        
        if (error) {
            return callback(error)
        }

        socket.join(user.room)
       
        socket.emit('message', generateMessage('admin','Welcome to the node.JS chat App! '))
        socket.broadcast.to(user.room).emit('message',generateMessage('admin',`${user.username} has join the chat room`))
        io.to(user.room).emit('roomData', {
            room: user.room,
            users: getUsersInRoom(user.room)
        })
        callback()
   })
    socket.on('send',(message, callback) =>{
        const user = getUser(socket.id)


        io.to(user.room).emit('message', generateMessage(user.username,message))
        callback()
    })

    socket.on('sendLocation', (location, callback) => {
        const user = getUser(socket.id)
        io.to(user.room).emit('locationMessage',generateLocationMessage(user.username,location))
        callback()
    })
    socket.on('disconnect', () => {
        const user = removeUser(socket.id)

        if (user){
            io.to(user.room).emit('message', generateMessage('Admin',`${user.username} has left!`))
            io.to(user.room).emit('roomData', {
                room: user.room,
                users: getUsersInRoom(user,user.room)
            })
        }
    })
})
server.listen(port, () =>{
    console.log(`Server is running on port ${port} !`)
})
