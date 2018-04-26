var express = require('express');
var bodyParser = require('body-parser');


var {mongoose} = require('./db/mongoose.js');
var {Todo} = require('./models/todo');
var {Users} = require('./models/users');


var app = express();

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



app.listen(3000, () => {
    console.log('started on port 3000');
});






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
// });