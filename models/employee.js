const mongoose = require('mongoose')


const employeeSchema = new mongoose.Schema({

    firstname: {
        type: String
    },
    lastname: {
        type: String
    },
    mobile: {
        type: String   
    },
    email: {
        type: String
    },
    gender: {
        type: String
    },
    branch: {
        type: String
    },
    password: {
        type: String
    },
    status:Number

})

module.exports = mongoose.model('Employee',employeeSchema)