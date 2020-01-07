const {MongoClient , objectId} = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'chat-app'

MongoClient.connect(connectionURL, {useNewUrlParser: true }, (error, client)=>{
    if(error){
        return console.log('Unable to connect to the database !')
    }

    const db = client.db(databaseName)
    
    db.collection('users').insertOne({
        name: 'Mehdi ',
        age: 24
    },(error,result) =>{
        if(error){
            return console.log('Unable to insert into the database!')
        }

        console.log(result.ops)
    }) 

    console.log('Connected correctly  to the database !')
})