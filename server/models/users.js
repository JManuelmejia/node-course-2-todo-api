
const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

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

//metodo para solo mostrar id y email como respuesta al usuario
UserShema.methods.toJSON = function () {

    var user =  this;
    var userObject = user.toObject();


    return _.pick(userObject, ['_id', 'email']);
};

//metodo para crear tokens
UserShema.methods.generateAuthToken = function () {
    var user = this;
    var access = 'auth';
    var token = jwt.sign({_id: user._id.toHexString(), access}, 'abc123').toString();

   user.tokens =  user.tokens.concat([{access,token}]);

    return user.save().then(() =>{                                          //?????
        return token;
    })
};

UserShema.statics.findByToken = function (token) {
    var User = this;
    var decoded;

    try{
        decoded = jwt.verify(token, 'abc123');
    }catch (e) {

        return Promise.reject();
        // return new promise((resolve, reject) =>{
        //    reject(); 
        
    }

    return User.findOne({
        '_id': decoded._id,
        'tokens.token': token,
        'tokens.access': 'auth'
    })
};

UserShema.pre('save', function (next){

    var user = this;
    
    
    if (user.isModified('password')){
        bcrypt.genSalt(10, (err,salt) => {
            bcrypt.hash(user.password, salt, (err, hash) => {
                user.password = hash;
                next();
            })
        })
    }else{
        next();
        }

});

//New user collection
var Users = mongoose.model('Users', UserShema);

module.exports = {
    Users
}