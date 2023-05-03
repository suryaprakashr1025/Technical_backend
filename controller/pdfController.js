const pdfDetails = require("../model/pdfSchema")
const multer = require("multer")
const path = require("path")
const dotenv = require("dotenv").config()

const Storage = multer.diskStorage({
    destination: "uploadPdf",
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({
    storage: Storage,
    fileFilter: function (req, file, cb) {
        console.log(file.mimetype);
        let filetypes = /pdf/;
        let mimetype = filetypes.test(file.mimetype);
        let extname = filetypes.test(path.extname(file.originalname).toLowerCase())

        if (mimetype && extname) {
            return cb(null, true);
        }

        cb("only supports the following filetypes: " + filetypes)

    }
}).array("book")



exports.uploadPdf = async (req, res) => {
    try {
        upload(req, res, (err) => {
            if (err) {
                console.log(err)
            } else {

                // console.log('fileDetails', req.files)

                const reqFiles = req.files

                const newImage = new pdfDetails({
                    bookName: req.body.bookName,
                    pdf: reqFiles.map(i => {
                        return `http://localhost:${process.env.PORT}/book/${i.filename}`
                    })
                })

                newImage.save().then(() => {

                    res.json({
                        message: "succefully uploaded",
                        profile_url: reqFiles.map(i => {
                            return `http://localhost:${process.env.PORT}/book/${i.filename}`
                        })
                    })
                }).catch((err) => {
                    console.log(err)
                })
            }
        })
    } catch (error) {
        res.status(500).json({ message: "something went wrong" })
    }
}


exports.viewBook = async (req, res) => {
    try {
        const {page = 1,limit = 5} = req.query
        const book = await pdfDetails.find().skip((page-1)*limit).limit(limit)
        res.json(book)
    } catch (error) {
        res.status(500).json({ message: "something went wrong" })
    }
}


exports.updateBook = async (req, res) => {
    try {
        const _id = req.params.bookId;
        const findBook = await pdfDetails.findById({ _id: _id })
        console.log(findBook.pdf)
        if (findBook) {
            upload(req, res, async (err) => {
                if (err) {
                    console.log(err)
                } else {
                    const reqFiles = req.files
                    console.log('reqFiles',reqFiles.length)
                    const bookName= req.body.bookName || findBook.bookName
                     const pdf =reqFiles.length>0? reqFiles.map(i => {
                            return `http://localhost:${process.env.PORT}/book/${i.filename}`
                        }) : findBook.pdf
                    
    
                   const updatebook = await pdfDetails.findByIdAndUpdate({_id:_id},{$set:{bookName:bookName,pdf:pdf}})
                        res.json({message:"updated successfully",updatebook})
                }
            })

        } else {
            res.json({ message: "book is not found" })
        }
    } catch (error) {
        res.status(500).json({ message: "something went wrong" })
    }
}


exports.deleteBook = async (req, res) => {
    try {
        const _id = req.params.bookId;
        const findBook = await pdfDetails.find({ _id: _id })
        if (findBook) {
            const deletebook = await pdfDetails.findByIdAndDelete({ _id })
            res.json({ message: "Book is deleted" })
        } else {
            res.json({ message: "book is not found" })
        }
    } catch (error) {
        res.status(500).json({ message: "something went wrong" })
    }
}