const {ObjectID} = require('mongodb')
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {Users} =  require('./../server/models/users')

 var id = '5ae1dd982742f3477537cd86';

// if (!ObjectID.isValid(id)){
//     console.log('Id not valid');
// }

// Todo.find({
//     _id: id
// }).then((todos) =>{
//     console.log('Todos', todos)
// });

// Todo.findOne({
//     _id: id
// }).then((todo) =>{
//     console.log('Todo', todo)
// });

// Todo.findById(id).then((todo) =>{
//     if (!todo){
//         return console.log('Id not found')
//     }
//     console.log('Todo by id', todo)
// }).catch((e) =>{
    
// });

Users.findById(id).then((user) => {
    if (!user){
        return console.log('User not found');
    }
    console.log('User found by ID: ', user)
}).catch((e) =>{
    console.log(e);
});