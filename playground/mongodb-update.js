const {MongoClient, ObjectID} = require('mongodb');                           //Crea un clinente usando distructing y tambien extrae la propiedad objectID



MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {     //Conectar con db, 

    if (err){
       return console.log('Unable to connect to mongo db server');
    }
     console.log('Connected to mongo db server');
     const db = client.db('TodoApp');

    //findOneAndUpdate

    db.collection('Todos').findOneAndUpdate({

        _id: new ObjectID('5ae12c30c02f555fdae764a6')
    }, {
        $set: {                                                              //Operador para hacer updates
            completed: true
        }
    }, {
        retunrOriginal: false
    }).then((result) => {
        console.log(result);
    });

    db.collection('Users').findOneAndUpdate({
        _id: new ObjectID('5ae12f1dc02f555fdae765a6'),
    },{
        $set: {
            name: 'Dani'
        },

        $inc:{
            age: 2
        }
    },{
        retunrOriginal: false
    }).then((result) =>{
        console.log(result);
    })

    //client.close();
});