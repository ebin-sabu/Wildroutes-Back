// Imports
const Route = require('../models/routemodel')
const User = require('../models/userModel')
const mongoose = require('mongoose')

// Get all routes

const getRoutes = async(req, res) => {
    /*
    const routes = await Route.find({user_id})
    */
    const routes = await Route.find({}).sort({"noLikes": -1, "location": 1})
    res.status(200).json(routes)
}

// Get single route

const getRoute = async(req, res) => {

    const {id} = req.params
    console.log(req.params)
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such route'})
    }
    const route = await Route.findById(id)
    if(!route){
        return res.status(404).json({error: 'No such route'})
    }
    res.status(200).json(route)
}

// Get region

const getRegion = async(req, res) => {
    const {region} = req.params
    console.log(region)
    const routes = await Route.find({region: region})
    res.status(200).json(routes)
}

// Get tag

const getTag = async(req, res) => {
    const {tag} = req.params
    console.log(tag)
    const routes = await Route.find({tag: tag})
    res.status(200).json(routes)
}

// Like a Single route

const likeRoute = async(req, res) => {
    const {id} = req.params
    const user_id = req.user._id

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such route'})
    }
    const route = await Route.findOneAndUpdate({_id : id}, {
        $push : {likedBy: user_id}, 
        $inc: {noLikes: 1}
    })

    if(!route){
        return res.status(400).json({error: 'No such route'})
    }
    res.status(200).json(route)
}

// Unlike a single route

const unLikeRoute = async(req, res) => {
    const {id} = req.params
    const user_id = req.user._id

    // Checks to see if id is valid
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such route'})
    }

    const route = await Route.findOneAndUpdate({_id : id}, {
        $pull : {likedBy: user_id},
        $inc : {noLikes: -1}
    })

    if(!route){
        return res.status(400).json({error: 'No such route'})
    }
    
    res.status(200).json(route)
}

// Get all Liked routes
const getLikedRoutes = async(req, res) => {
    const user_id = req.user._id
    console.log(user_id)
    const routes = await Route.find({likedBy:user_id}).sort({"location": 1})
    res.status(200).json(routes)
}

// Create new route
const createRoute = async(req, res) => {
    
    const{title, region, location, rating, description, tag, bookingLink, imageLink} = req.body
    // Add doc to db
    //Added user_id and user_name
    try{
        const user_id = req.user._id
        const madeBy = req.user.name
        console.log(req.user.name)
        const route = await Route.create({title, region, location, rating, description, tag, bookingLink, imageLink, madeBy, user_id})
        res.status(200).json(route)
    }catch(error){
        res.status(400).json({error: error.message})
    }
}

// Delete single route
const deleteRoute = async(req, res) => {
    const {id} = req.params

    // Checks to see if id is valid
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such route'})
    }

    // The property name is not just id but _id
    const route = await Route.findOneAndDelete({_id : id})

    if(!route){
        return res.status(400).json({error: 'No such route'})
    }

    res.status(200).json(route)
}

// Update single route
const updateRoute = async (req, res) => {
    const {id} = req.params

    // Checks to see if id is valid
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such route'})
    }

    const route = await Route.findOneAndUpdate({_id : id}, {
        // Spread properties of object
        ...req.body
    })

    if(!route){
        return res.status(400).json({error: 'No such route'})
    }

    res.status(200).json(route)
}

// getRoutes made by user 
const myRoutes = async(req, res) =>{
    const user_id = req.user._id
    console.log(user_id)
    const routes = await Route.find({user_id:user_id}).sort({"location": 1})
    res.status(200).json(routes)
}

// Exports
module.exports = {
    getRoutes,
    getRoute,
    getRegion,
    getTag,
    likeRoute,
    unLikeRoute,
    getLikedRoutes,
    createRoute,
    deleteRoute,
    updateRoute,
    myRoutes
}