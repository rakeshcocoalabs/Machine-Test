const express = require('express')
const router = express.Router()
const Employee = require('../models/employee')
const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(10);
const jwt = require('jsonwebtoken');
exports.add = async (req, res) => {

    const params = req.body;


    const hash = bcrypt.hashSync(params.password, salt);

    const user = new Employee({
        firstname: params.name,
        lastname: params.lastname,
        branch: params.branch,
        email: params.email,
        mobile: params.mobile,
        tsCreatedAt: Date.now(),
        gender:params.gender,
        password:hash,
        status:1
    })

    try {
        const output = await user.save()
        res.send({
            success:1, message:"added successfully"
        })
    } catch (err) {
        res.send({
            success: 0,
            error: err.message
        })
    }
}

exports.list = async(req,res) => {

    var filter = {};
    filter.status = 1;
    var proj = {};
    proj.firstname = 1;
    proj.lastname = 1;
    proj.email = 1;
    proj.mobile = 1;
    proj.branch = 1;

    var list = await Employee.find(filter,proj).catch(err =>{
        return {
            success:0,
            message:err.message
        }
    })

    if(list && list.success != 0 && list.success === 0) {
        return res.send(list)
    }

    return res.send({
        items:list,
        message:"listed successfully",
        success:0
    })
}

exports.update = async(req,res) => {

    const params = req.body;
    var update = {};

    if (params.firstname){
        update.firstname = params.firstname
    }
    if (params.lastname){
        update.lastname = params.lastname
    }
    if (params.email){
        update.email = params.email
    }
    if (params.branch){
        update.branch = params.branch
    }
    if (params.mobile){
        update.mobile = params.mobile
    }
    var filter = {};
    filter.status = 1
    filter._id = req.params.id;

    var result = await Employee.updateOne(filter,update).catch(err => {
        return {
            success:1, message:err.message
        }
    })

    if (result && result.success != undefined && result.success === 0){
        return res.send(result)
    }

    return res.send({
        success:1, message:"updated"
    })
}
exports.remove = async(req,res) => {

    const params = req.body;
    var update = {};

    update.status = 0;
    var filter = {};
    filter.status = 1
    filter._id = req.params.id;

    var result = await Employee.updateOne(filter,update).catch(err => {
        return {
            success:1, message:err.message
        }
    })

    if (result && result.success != undefined && result.success === 0){
        return res.send(result)
    }

    return res.send({
        success:1, message:"updated"
    })
}

