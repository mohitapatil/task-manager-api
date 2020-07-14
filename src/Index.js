const express = require('express')
require('./db/mongoose')
const { request } = require('express')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const app= express()

const port = process.env.PORT

// app.use((req,res,next)=> {
//     if(req.method === 'GET'){
//         res.send('get req are disabled')
//     } else {
//         next()
//     }

// })

/////WHEN MAINTAINANCE CODE
// app.use((req,res,next)=> {
//     res.status(503).send('Site is down.check back soon')
// })


const multer = require('multer')
const upload = multer({
    dest: 'images',
    limits: {
        fileSize: 1000000
    },
    fileFilter(req,file, cb){
        if(!file.originalname.match(/\.(doc|docx)$/)){
            return cb(new Error('Please provide eord document'))
        }
        cb(undefined,true)


        // cb(new Error('file must be pdf'))
        // cb(undefined, true)
        // cb(undefined,false)
    }
})
app.post('/upload', upload.single('upload'),(req,res)=> {
    res.send()
})

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)



app.listen(port,()=> {
    console.log('port')
})

// const Task = require('./models/task')
// const User = require('./models/user')


// const  main = async ()=>{
//     // const task = await Task.findById('5f0c478259a32958adc4aff8')
//     // await task.populate('owner').execPopulate()
//     // console.log(task.owner)

//     const user = await User.findById('5f0bdd4e6e0b253806a27c9b')
//     await user.populate('task').execPopulate()
//     console.log(user.task)

// }

// main()
