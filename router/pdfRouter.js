const express = require("express")
const router = express.Router()
const {uploadPdf,viewBook,updateBook, deleteBook} = require("../controller/pdfController")
const {adminAuthorization} = require("../auth/adminAuth")
const {commonAuthorization} = require("../auth/commonAuth")



router.post("/uploadpdf",adminAuthorization,uploadPdf)
router.get("/viewbook",commonAuthorization,viewBook)
router.put("/updatebook/:bookId",adminAuthorization,updateBook)
router.delete("/deletebook/:bookId",adminAuthorization,deleteBook)


module.exports = router