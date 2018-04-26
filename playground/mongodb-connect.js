//const MongoClient = require('mongodb').MongoClient;                         //Crear cliente
const {MongoClient, ObjectID} = require('mongodb');                           //Crea un clinente usando distructing y tambien extrae la propiedad objectID

//var obj = new ObjetcID();                                                     //Crea Objects ID

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {     //Conectar con db, 

    if (err){
       return console.log('Unable to connect to mongo db server');
    }
     console.log('Connected to mongo db server');
     const db = client.db('TodoApp');

    //Insetar conllection y Documentos en database Mongo
    //  db.collection('Todos').insertOne({
    //      text: 'Play Guitar',
    //      completed: false

    //  }, (err, result) => {
    //     if (err){
    //         return console.log('Unable to insert todo', err);
    //     }

    //     console.log(JSON.stringify(result.ops, undefined, 2));

    //  });

    db.collection('Users').insertOne({
        name: 'Juan',
        age:  26,
        location: 'Envigado'
    }, (err, result) => {

        if (err){
            console.log('Unable to insert user', err);
        }

        console.log(result.ops[0]._id.getTimestamp());

    })

     client.close();
});