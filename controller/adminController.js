const adminDetails = require('../model/adminSchema')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv').config()

exports.createAdmin = async (req,res) =>{

    try{
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(req.body.password,salt)
        req.body.password = hash
        const findAdmin = await adminDetails.find()
        console.log(findAdmin)
        const admin = await new adminDetails(req.body)
    
        if(findAdmin.length === 0){
            admin.save().then(()=>{
                res.json({message:'Admin created',admin})
            }).catch(()=>{
                res.json({message:'Admin not created'})
            })
        }else{
            res.json({message:"Admin account already exists"})
        }
        
    }catch(error){
        res.status(500).json({message:'something went wrong'})
    }
    

}


exports.loginAdmin = async(req,res) =>{
    try{
        const findAdmin = await adminDetails.findOne({adminName:req.body.adminName})
        console.log('adminName',findAdmin)
        if(findAdmin){
            const token = jwt.sign({_id:findAdmin._id,admin:process.env.ADMIN},process.env.JWT_SECRET,{expiresIn:'1d'})
            // const check = jwt.verify(token,process.env.JWT_SECRET)
            // console.log(check.admin)
            if(token){
                const compare = await bcrypt.compare(req.body.password,findAdmin.password)
                console.log('compare',compare)

                if(compare){
                    res.status(200).json({message:"success",token})
                }else{
                    res.status(403).json({message:'adminname and password is incorrect" '})
                }

            }else{
                res.status(404).json({message:'Token is not found'})
            }

        }else{
            res.status(404).json({message:"Admin is not found"})
        }

    }catch(error){
        res.status(500).json({message:"something went wrong"})
    }
}