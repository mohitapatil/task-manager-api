const mongoose = require('mongoose')
// MONGODB_URL=mongodb://127.0.0.1:27018/task-manager-api

mongoose.connect(process.env.MONGODB_URL,{
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})






















