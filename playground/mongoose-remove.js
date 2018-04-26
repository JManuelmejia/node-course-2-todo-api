const {ObjectID} = require('mongodb')
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {Users} =  require('./../server/models/users')

//Todo.remove({})

// Todo.remove({}).then((result) =>{
//     console.log(result);
// });

//Todo.findOneAndRemove({})

//Todo.findByIdAndRemove

Todo.findByIdAndRemove('5ae25b13c02f555fdae79050').then((todo) =>{
    console.log(todo);
});