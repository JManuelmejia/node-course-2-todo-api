//const MongoClient = require('mongodb').MongoClient;                         //Crear cliente
const {MongoClient, ObjectID} = require('mongodb');                           //Crea un clinente usando distructing y tambien extrae la propiedad objectID

//var obj = new ObjetcID();                                                     //Crea Objects ID

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {     //Conectar con db, 

    if (err){
       return console.log('Unable to connect to mongo db server');
    }
     console.log('Connected to mongo db server');
     const db = client.db('TodoApp');

// //Trae los documentos y los convierte en arreglos
//     db.collection('Todos').find({
//         _id: new ObjectID('5ae118e6c02f555fdae75f3a')                            //Se debe buscar con new ObejctId ya que el id es un objeto y no un string
//     }).toArray().then((docs) =>{                     
//         console.log('Todos');
//         console.log(JSON.stringify(docs, undefined, 2));
//     }, (err) =>{
//         console.log('Unable to fetch todos', err)
//     });

// //Trae los documentos y los convierte en arreglos
// db.collection('Todos').find().count().then((count) =>{                     
//     console.log(`Todos count: ${count}`);
// }, (err) =>{
//     console.log('Unable to fetch todos', err)
// });

    db.collection('Users').find({name: 'Juan'}).toArray().then((docs) =>{

        console.log('The user fetched are: ', JSON.stringify(docs, undefined, 2));
        
    }, (err) =>{
        console.log('Unable to fetch users', err);
    });

    //client.close();
});