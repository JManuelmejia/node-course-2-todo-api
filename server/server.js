const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {mongoose} = require('./db/mongoose.js');

var {Todo} = require('./models/todo');
var {Users} = require('./models/users');
var {ObjectID} = require('mongodb')


var app = express();
var port = process.env.PORT || 3000;                             //Linea para desplegar app en heroku

app.use(bodyParser.json());

//Crear todos
app.post('/todos', (req, res) => {
    var todo = new Todo({
        text: req.body.text
    })

    todo.save().then((doc) => {
        res.send(doc);                                          //Envia respuesta al cliente
    }, (e) => {
        res.status(400).send(e);
    })

});

//Encontrar todos
app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.send({todos});
    }, (e) => {
        res.status(400).send(e);
    })
});

//Encontrar Todo por ID
app.get('/todos/:id', (req, res) => {
    var id = req.params.id;
    if (!ObjectID.isValid(id)){
       return res.status(404).send();
    }

    Todo.findById(id).then((todo) => {
        if (!todo){
            return res.status(404).send()
        }
        res.status(200).send({todo});
    }).catch((e) => {
        res.status(404).send();
    })
});

//Borrar Todo by ID
app.delete('/todos/:id', (req, res) =>{
    var id = req.params.id;
    if (!ObjectID.isValid(id)){
        return res.status(404).send();
    }
    Todo.findByIdAndRemove(id).then((todo) =>{
        if (!todo){
            return res.status(404).send();
        }
        res.status(200).send({todo});
    }).catch((e) =>{
        res.status(404).send();
    })
})

//Editar todo
app.patch('/todos/:id', (req, res) =>{
    var id = req.params.id;
    var body = _.pick(req.body, ['text', 'completed']);             //Ingresa las propiedades al objeto

    if (!ObjectID.isValid(id)){
        return res.status(404).send();
    }

    if (_.isBoolean(body.completed) && body.completed){
        body.completedAt = new Date().getTime();
    }else{
        body.completed = false;
        body.completed = null;
    }

    Todo.findByIdAndUpdate(id,{$set: body},{new: true }).then ((todo) => {
        if (!todo){
            return res.status(400).send()
        }

        res.send({todo});
        
    }).catch((e) => {
        res.status(400).send();
    });
    
} )

app.listen(port, () => {
    console.log(`Started up on port ${port}`);
});


module.exports = {
    app
}



//----------Ejmeplos-------------//

// //Nuevo documento
// var fullTodo = new Todo({
//     text: ' Play piano '
// });

// //Guardar docuemento
// fullTodo.save().then((doc) => {
//     console.log('Save todo', doc)
// }, (e) => {
//     console.log('Unable to save todo',e)
// });

// var newUser = new Users({
//     email: 'manuel.arias55@gmail.com'
// });

// newUser.save().then((doc) => {
//     console.log('User saved',doc);
// }, (e) => {
//     console.log('Unable to save user',e);
// })