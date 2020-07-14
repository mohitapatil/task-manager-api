// const mongodb = 
// const MongoClient = mongodb.MongoClient
const { MongoClient, ObjectID} =require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27018'
const databaseName = 'task-manager'

MongoClient.connect(connectionURL,{useNewUrlParser: true,useUnifiedTopology: true }, (error, client) => {
    if(error){
        return console.log('Unabel to connect database')
    }
    const db = client.db(databaseName)

    // db.collection('users').insertOne({
    //     name: 'Pewdipi',
    //     age: 27
    // },(error,result)=> {
    //     if(error){
    //         return console.log('Unabel to insert users')
    //     }
    //     console.log(result.ops)
    // })


    // db.collection('tasks').insertMany([
    // {
    //     description: 'Clean the House',
    //     completed: true
    // },{
    //     description: 'rdtfghj',
    //     completed: false
    // }
    // ],(error,result)=> {
    //     if(error){
    //         return console.log('Unabel to insert tasks')
    //     }
    //     console.log(result.ops)
    // })

    


})

