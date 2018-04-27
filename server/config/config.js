var env = process.env.NODE_ENV || 'development';                                 //Variable de entrono para test


if (env === 'development'){
    //corre de forma local
    process.env.PORT = 3000;
    process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoApp'
}else if (env === 'test'){
    //Corre en test
    process.env.PORT = 3000;
    process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoAppTest'
}
