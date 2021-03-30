const express = require('express')
const router = express.Router()
const Alien = require('../models/alien')


exports.addAlien = async(req,res) => {

    console.log(req.file.filename)
    const alien = new Alien({
        name: req.body.name,
        tech: req.body.tech,
        sub: req.body.sub
    })
    
    try{
        const a1 =  await alien.save() 
        res.json(a1)
    }catch(err){
        res.send(err.message)
    }
}