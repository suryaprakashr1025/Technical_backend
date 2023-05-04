const mongoose = require('mongoose')
const schema = mongoose.Schema
const model = mongoose.model


const pdfSchema = new schema({
    bookname:{
        type:String,
        required:true,
        trim:true
    },
    pdf:{
        type:String,
        required:true,
        trim:true
    }
})

module.exports = new model('Pdf',pdfSchema)