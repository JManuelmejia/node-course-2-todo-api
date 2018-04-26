var mongoose = require('mongoose');


mongoose.Promise = global.Promise;                                  //setup para usar promises con mongoose
mongoose.connect('mongodb://localhost:27017/TodoApp');              //Conectar con mongodb

//Modelo para los documentos de Todo
var Todo = mongoose.model('Todo', {
    text: {
        type: String
    },
    completed: {
        type: Boolean
    },
    completedAt: {
        type: Number
    }
});

//Nuevo documento
var newTodo = new Todo({

    text: 'Cook dinner'

});

//Guardar docuemento
newTodo.save().then((doc) =>{
    console.log('save todo',doc)
}, (e) =>{
    console.log('Unable to save todo',e)
})

var fullTodo = new Todo({
    text: 'Play guitar',
    completed: false,
    completedAt: 0
})

fullTodo.save().then((doc) => {
    console.log('Save todo', doc)
}, (e) => {
    console.log('Unable to save todo')
})