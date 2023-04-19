const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema

const userSchema = new Schema({
    name:{
        type: String,
        required: true,
        default: "User"
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    location:{
        type: String,
    }
})

// Static signup method
userSchema.statics.signup = async function (name,location, email, password) {

    // validation
    if(!name|| !location || !email || !password){
        throw Error('All fields must be filled')
    }

    if(!validator.isEmail(email)){
        throw Error('Invalid email')
    }

    if(!validator.isStrongPassword(password)){
        throw Error('Password not strong enough. Must be more than 8 characters with lowercase (a), uppercase (A), number (1) and special characters (!)')
    }
    
    const exists = await this.findOne({email})

    if(exists){
        throw Error('Email already in use')
    }

    // salt is a random string of character added to it before hashing
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({name,location, email, password: hash})
    return user

}

// Static login method
userSchema.statics.login = async function(email, password){
    
    // validation
    if(!email || !password){
        throw Error('All fields must be filled')
    } 
    
    const user = await this.findOne({email})

    if(!user){
        throw Error('Incorrect email')
    }

    const match = await bcrypt.compare(password, user.password)
    
    if(!match){
        throw Error('Incorrect password')
    }

    return user
}

module.exports = mongoose.model('User', userSchema)
