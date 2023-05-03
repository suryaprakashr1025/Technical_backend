const mongoose = require('mongoose')
const schema = mongoose.Schema
const model = mongoose.model


const pdfSchema = new schema({
    bookName:{
        type:String,
        required:true,
        trim:true
    },
    pdf:{
        type:Array,
        required:true,
        trim:true
    }
})

module.exports = new model('Pdf',pdfSchema)