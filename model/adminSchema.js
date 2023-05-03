const mongoose = require('mongoose')
const schema = mongoose.Schema
const model = mongoose.model

const validateEmail = (email) =>{
    const emailValidateCode = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return emailValidateCode.test(email)
}


const adminSchema = new schema ({
    adminName:{
        type:String,
        required:true,
        trim:true,
        min:3
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true,
        lowercase:true,
        validate:[validateEmail,'Please fill valid email address'],
        match:[/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,'Please fill valid email address'],
        min:11
    },
    password:{
        type:String,
        required:true,
        min:8,
        max:15
    }

})

module.exports = new model("Admin",adminSchema)