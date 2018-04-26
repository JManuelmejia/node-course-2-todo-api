const {MongoClient, ObjectID} = require('mongodb');                           //Crea un clinente usando distructing y tambien extrae la propiedad objectID

                                                     //Crea Objects ID

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {     //Conectar con db, 

    if (err){
       return console.log('Unable to connect to mongo db server');
    }
     console.log('Connected to mongo db server');
     const db = client.db('TodoApp');

    // //deleteMany

    // db.collection('Todos').deleteMany({text: 'Eat lunch'}).then((result) =>{
    //     console.log(result);
    // });

    // //deletOne
    // db.collection('Todos').deleteOne({text: 'Eat lunch'}).then((result) =>{
    //     console.log(result);
    // });

    //findOneAndDelete
    // db.collection('Todos').findOneAndDelete({completed: false}).then((result) =>{
    //     console.log(result);
    // })

    // db.collection('Users').deleteMany({name: "Juan"}).then((result) =>{
    //     console.log(result);
    // });

    db.collection('Users').findOneAndDelete({
        _id: new ObjectID('5ae111bc04df7f22223bdcae')
    }).then((result) =>{
        console.log(result);
    });

    //client.close();
});