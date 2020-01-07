const {MongoClient , objectId} = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'chat-app'

MongoClient.connect(connectionURL, {useNewUrlParser: true }, (error, client)=>{
    if(error){
        return console.log('Unable to connect to the database !')
    }

    const db = client.db(databaseName)
    
    console.log('Connected correctly  to the database !')
})