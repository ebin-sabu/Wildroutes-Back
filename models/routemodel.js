const mongoose = require('mongoose')
const Schema = mongoose.Schema

// A schema defines the structure of a document
const routeSchema = new Schema({
    title: {
        type: String,
        required: true,
        default: "No title"
    },    
    region:{
        type: String,
        required: true,
        default: "No region"
    },
    location:{
        type: String,
        required: true,
        default: "No location"
    },
    description:{
        type: String,
        required: true,
        default: "No description"
    },
    tag:{
        type: String,
        required: true,
        default: "No tag"
    },
    madeBy:{
        type: String,
        default: "Wildroutes User"
    },
    bookingLink:{
        type: String,
        default: "https://github.com/marcbeep/Wildroutes"
    },
    imageLink:{
        type: String,
        default: "https://images.pexels.com/photos/7130469/pexels-photo-7130469.jpeg"    
    },
    noLikes:{
        type: Number,
        default: 0
    },
    likedBy:[
        {
            type: String
        }
    ],
    //Added User_id this needs to be used so that only th right user can delete a post
    user_id:{
        type: String,
        required: true
    },
    rating:{
        type: String,
        default: "No rating"
    }
})

// A model applies that schema to a particular model
module.exports = mongoose.model('Route', routeSchema)
