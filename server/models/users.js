const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

var UserShema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        minlength: 1,
        trim: true,
        unique: true,                                   //Verifica que no hay dos docuementos en la coleccion de usuarios con el mismo email
        validate:{
            validator: validator.isEmail,
            message: '{VALUE} is not a valid email'
            },
            
        },
    password: {
        type: String,
        require: true,
        minlength: 6
    },
    tokens: [{
        access: {
            type: String,
            require: true
        },
        token:{
            type: String,
            require
        }
    }]
});

UserShema.methods.toJSON = function () {

    var user =  this;
    var userObject = user.toObject();


    return _.pick(userObject, ['_id', 'email']);
};

//Para crear metodos
UserShema.methods.generateAuthToken = function () {
    var user = this;
    var access = 'auth';
    var token = jwt.sign({_id: user._id.toHexString(), access}, 'abc123').toString();

   user.tokens =  user.tokens.concat([{access,token}]);

    return user.save().then(() =>{                                          //?????
        return token;
    })
};

//New user collection
var Users = mongoose.model('Users', UserShema);

module.exports = {
    Users
}