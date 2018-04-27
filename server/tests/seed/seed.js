const {ObjectID} = require('mongodb');
const jwt = require('jsonwebtoken');

const {Todo} = require('./../../models/todo');
const {Users} = require('./../../models/users');


var userOneId = new ObjectID();
var userTwoId = new ObjectID();

const users = [{
    _id: userOneId,
    email: 'manuel@example.com',
    password: 'userOnesPass',
    tokens: [{
        access: 'auth',
        token: jwt.sign({_id: userOneId, access: 'auth'}, 'abc123').toString()

    }]
    },{
        _id: userTwoId,
        email: 'juan@example.com',
        password: 'userTwoPass'

    }];

const todos = [{
    _id: new ObjectID(),
    text: 'First test todo',
},{
    _id: new ObjectID(),
    text: 'Second test todo',
    completed: true,
    completedAt: 333
}];


const populateTodos = (done) =>{
    Todo.remove({}).then(() => {;
        return Todo.insertMany(todos);
    }).then(() => done());
};

const populateUsers = (done) => {
    Users.remove({}).then(() =>{
        var userOne = new Users(users[0]).save();
        var userTwo = new Users(users[1]).save();

       return Promise.all([userOne, userTwo]);
    }).then(() => done());
};

module.exports = {todos, populateTodos, users, populateUsers};