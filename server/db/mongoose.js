var mongoose = require('mongoose');


mongoose.Promise = global.Promise;                                  //setup para usar promises con mongoose
mongoose.connect(process.env.MONGODB_URI);              //Conectar con mongodb

module.exports = {
    mongoose
};