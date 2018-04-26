var mongoose = require('mongoose');


mongoose.Promise = global.Promise;                                  //setup para usar promises con mongoose
mongoose.connect('mongodb://localhost:27017/TodoApp');              //Conectar con mongodb

module.exports = {
    mongoose
};