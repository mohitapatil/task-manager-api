const mongoose = require('mongoose')
const validateor = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Task= require('./task')

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true
    },
    email:{
        type:String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if(!validateor.isEmail(value)){
                throw new Error('Email is invalid')
            }
        }
    }, 
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
        validate(value){
            if(value.toLowerCase().includes('password')){
                throw new Error('password cannot be "password"')
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value){
            if(value <0){
                throw new Error('age must be +ve')
            }
        }
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
    avatar: {
        type: Buffer
    }
},
{
    timestamps: true
})

userSchema.virtual('task',{
    ref: 'Task',
    localField: '_id',
    foreignField: 'owner'
})

userSchema.pre('save',async function(next){
    const user = this

    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})

//Delet user tasks when user is removed
userSchema.pre('remove',async function(next){
    const user = this
    await Task.deleteMany({ owner: user._id})
    next()
})

userSchema.methods.generateAuthToken= async function (){
    const user = this
    const token = jwt.sign({_id: user.id.toString()},process.env.JWT_SECRET)
    console.log(token)
    user.tokens = user.tokens.concat({ token })
    await user.save()

    return token
}

userSchema.methods.toJSON = function(){
    const user = this
    const userObject = user.toObject()

    delete userObject.password
    delete userObject.tokens
    delete userObject.avatar

    return userObject
}

userSchema.statics.findByCredentials = async (email,password)=> {
    const user = await User.findOne({email})
    if(!user){
        throw new Error('Unabel to login')
    }
    const isMatch = await bcrypt.compare(password,user.password)

    if(!isMatch){
        throw new Error('Unabel to login')
    }
    return user
}

//hash plain text password before saving
const User = mongoose.model('User',userSchema)


module.exports = User