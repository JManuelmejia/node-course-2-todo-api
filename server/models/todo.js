var mongoose = require('mongoose');

//Modelo para los documentos de Todo
var Todo = mongoose.model('Todo', {
    text: {
        type: String,
        required: true,                                               //indica que la propiedad debe de ser ingresada
        minlenght: 1,
        trim: true                                                  //Validacion que elimina espacios al incio y final
        
    },
    completed: {
        type: Boolean,
        default: false
    },
    completedAt: {
        type: Number,
        default: null
    }
});

module.exports = {
    Todo: Todo
}


