var express = require('express');
var bodyParser = require('body-parser');
var {mongoose} = require('./db/mongoose.js');

var {Todo} = require('./models/todo');
var {Users} = require('./models/users');
var {ObjectID} = require('mongodb')


var app = express();
var port = process.env.PORT || 3000;                             //Linea para desplegar app en heroku

app.use(bodyParser.json());

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

app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.send({todos});
    }, (e) => {
        res.status(400).send(e);
    })
});

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